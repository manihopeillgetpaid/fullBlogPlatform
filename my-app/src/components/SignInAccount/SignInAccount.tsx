import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from '../modules/sign.module.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootSt } from "../../redux/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { logInUser } from "../../redux/authSlice";
import Loading from "../Loading/Loading";
const SignInAccount: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
   const navigate = useNavigate();
   const { register, handleSubmit, formState: {errors}} = useForm<RegisterForm>();
    const [serverErrors, setServerErrors] = useState<ServerErrors | null>(null);
    const submit: SubmitHandler<RegisterForm>= async(data) => {
        const res = await dispatch(logInUser({
            email: data.email,
            password: data.password
        }));
        setServerErrors({})
        if(logInUser.fulfilled.match(res)){
            navigate('/')
        }
        else if(logInUser.rejected.match(res)){
            setServerErrors(res.payload || {})
        }
  
    }
    const loading = useSelector((state: RootSt) => state.auth.loading)
    if(loading){
      return <Loading />
    }
    return ( 
        <div className={style.container}>

            <p className={style.title}>Sign In</p>

            <form action="" className={style.form} onSubmit={handleSubmit(submit)}>

                <label htmlFor="email" className={style.label} >Email address
                    <input type="email" id='email' className={style.input} placeholder="Email address"
                    {...register('email', {required: 'Email is required', pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Invalid email address" }})}/>
                    {errors.email && <span className={style.error}>{errors.email.message}</span>}
                  
                </label>

                <label htmlFor="password"  className={style.label}> Password
                    <input type="password" id="password" className={style.input} placeholder="Password"
                    {...register('password',{ required: 'Password is required', minLength: {value: 6, message: "Password must be at least 6 characters"}, maxLength:{value: 40, message:"Password must be at most 40 characters"}})}/>
                    {errors.password && <span className={style.error}>{errors.password.message}</span>}
                    {serverErrors?.errors?.["email or password"] && <span className={style.error}>{`Email or password ${serverErrors.errors["email or password"]}`}</span>}
                </label>
             
                <button type="submit" className={style.submit}> Login </button>
           
            </form>

            <p className={style.create}>Don't have an account? <Link to='/sign-up' className={style.text}> Sign Up.</Link></p>

        </div>
    );
}
 
export default SignInAccount;