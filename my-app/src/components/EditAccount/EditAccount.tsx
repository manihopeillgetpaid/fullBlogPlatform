import React, { useState } from "react";
import style from '../modules/sign.module.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootSt } from "../../redux/store";
import { SubmitHandler, useForm } from "react-hook-form";
import { editProfile } from "../../redux/authSlice";
import Loading from "../Loading/Loading";

const EditAccount: React.FC = () => {
    const name = useSelector((state: RootSt) => state.auth.username);
    const email = useSelector((state: RootSt) => state.auth.email);
    const token = useSelector((state: RootSt) => state.auth.token);
        const image = useSelector((state: RootSt) => state.auth.image);
    const { register, handleSubmit, formState: {errors}} = useForm<EditRequest>({
        defaultValues: {
            username: name,
            email: email,
            image: image
        }
     });
     
    const [serverErrors, setServerErrors] = useState<Record<string, string[]> | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const submit: SubmitHandler<EditRequest> = async (data) => {
        const res = await dispatch(editProfile({
          obj: { username: data.username,
            email: data.email?.toLowerCase(),
            password: data.password,
            image: data.image},
            token: token
        }));
        setServerErrors({})
         if (editProfile.rejected.match(res)) {
                setServerErrors(res.payload || {});
            }
    }
    const loading = useSelector((state: RootSt) => state.create.loading)
     if(loading){
       return <Loading />
     }
    return ( 
        <div className={style.container} style={{ height: '500px'}}>
        
        <p className={style.title}>Edit Profile</p>

        <form action="" className={style.form} onSubmit={handleSubmit(submit)}>

            <label htmlFor="name" className={style.label} > Username
                <input type="text" id='name' className={style.input} 
                 {...register('username', {required: 'Username is required'})}/>
                 {errors.username && <span className={style.error}>{errors.username.message}</span>}
                 {serverErrors?.username && <span className={style.error}>{`Username ${serverErrors.username}`}</span>}
            </label>

            <label htmlFor="email" className={style.label}>Email
                <input type="email" id='email' className={style.input} 
                 {...register('email', {required: 'Email is required', pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Invalid email address" }})} />
                  {errors.email && <span className={style.error}>{errors.email.message}</span>}
                  {serverErrors?.email && <span className={style.error}>{`Email ${serverErrors.email}`}</span>}
            </label>

            <label htmlFor="password"  className={style.label}> New password
                <input type="password" id="password" className={style.input} placeholder="Password"
                 {...register('password', { minLength: {value: 6, message: "Password must be at least 6 characters"}, maxLength:{value: 40, message:"Password must be at most 40 characters"}})} />
                 {errors.password && <span className={style.error}>{errors.password.message}</span>}
            </label>

            <label htmlFor="avatar"  className={style.label} style={{ marginBottom: '21px'}}> {'Avatar image (url)'}
                <input type="text" id="avatar" className={style.input} {...register('image', {pattern: { value: /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/, message: 'Invalid url' }})} placeholder="Avatar image"/>
            </label>

            <button type="submit" className={style.submit}> Save </button>

        </form>

    </div>
     );
}
 
export default EditAccount;