import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "antd";
import style from '../modules/sign.module.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/authSlice";
import { AppDispatch, RootSt } from "../../redux/store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Loading from "../Loading/Loading";
const SignUpAccount: React.FC = () => {
    const {register, handleSubmit,control, watch, formState: {errors}} = useForm<RegisterForm>();
      const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [serverErrors, setServerErrors] = useState<Record<string, string[]> | null>(null);
    const submit: SubmitHandler<RegisterForm> = async (data) => {
        if(data.password !== data.repeatPassword){
          alert('passwords do not match');
          return;
         }
        const res = await dispatch(registerUser({ username: data.username,
            email: data.email.toLowerCase(),
            password: data.password}));
            setServerErrors({})
        if(registerUser.fulfilled.match(res)){
            navigate('/')
        }else if (registerUser.rejected.match(res)) {
            setServerErrors(res.payload || {});
          }
       
   }
   const loading = useSelector((state: RootSt) => state.auth.loading)
   if(loading){
     return <Loading />
   }
   const watchedPassword = watch('password', '')
    return (
           <div className={style.container} style={{ height: '600px'}}>
        
                    <p className={style.title}>Create new account</p>
        
                    <form action="" className={style.form} onSubmit={handleSubmit(submit)} >

                        <label htmlFor="name" className={style.label}>Username
                            <input type="text" id='name' placeholder="Username" className={style.input} {...register('username', { required: 'Username is required', minLength: {value: 3, message: "Username must be at least 3 characters"}, maxLength:{value: 20, message:"Username must be at most 20 characters"}})}/>
                            {errors.username && <span className={style.error}>{errors.username.message}</span>}
                            {serverErrors?.username && <span className={style.error}>{`Username ${serverErrors.username}`}</span>}
                        </label>
        
                        <label htmlFor="email" className={style.label}>Email address
                            <input type="email" id='email' className={style.input} {...register('email', {required: 'Email is required', pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Invalid email address" }})} placeholder="Email address"/>
                            {errors.email && <span className={style.error}>{errors.email.message}</span>}
                            {serverErrors?.email && <span className={style.error}>{`Email ${serverErrors.email}`}</span>}
                        </label>
        
                        <label htmlFor="password"  className={style.label}> Password
                            <input type="password"  id="password" className={style.input} {...register('password',{ required: 'Username is required', minLength: {value: 6, message: "Password must be at least 6 characters"}, maxLength:{value: 40, message:"Password must be at most 40 characters"}})} placeholder="Password"/>
                            {errors.password && <span className={style.error}>{errors.password.message}</span>}
                        </label>

                        <label htmlFor="password"  className={style.label}> Repeat Password
                            <input type="password" {...register('repeatPassword', { required: 'Repeat password is required', validate: value => value === watchedPassword || 'Passwords do not match'})} id="password" className={style.input} placeholder="Repeat password" />
                            {errors.repeatPassword && <span className={style.error}>{errors.repeatPassword.message}</span>}
                        </label>
        
                        <div className={style.line}></div>
                        <label className={style.label}>
          <Controller
            name="agree"
            control={control}
            rules={{ required: "You must agree to continue" }}
            render={({ field }) => (
              <Checkbox {...field} checked={field.value} className={style.checkbox}>
                I agree to the processing of my personal information
              </Checkbox>
            )}
          />
          {errors.agree && <span className={style.error}>{errors.agree.message}</span>}
        </label>
        
                        
                        <button type="submit" className={style.submit} > Login </button>
        
                    </form>

                    <p className={style.createAcc}>Already have an account? <Link to='/sign-in' className={style.text}> Sign In.</Link></p>
        
                </div>

     );
}
 
export default SignUpAccount;
// testAccountAn@mail.ru
// helloworld