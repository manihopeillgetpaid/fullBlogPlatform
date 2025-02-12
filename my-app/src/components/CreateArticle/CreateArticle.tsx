import React, { useState } from 'react';
import style from '../modules/sign.module.css'
import './index.css';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootSt } from '../../redux/store';
import { createArticle } from '../../redux/createArticle';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

const CreateArticle: React.FC = () => {
      const {register, handleSubmit,control, formState: {errors}} = useForm<ArticleForm>({
        defaultValues: { tagList: [{ value: '' }] }
      });
      const navigate = useNavigate()
      const dispatch = useDispatch<AppDispatch>();
      const [serverErrors, setServerErrors] = useState<ServerErrorsArticle | null>(null);
     const { fields, append, remove} = useFieldArray({control, name: "tagList" });
     const submit: SubmitHandler<ArticleForm> = async (data) =>{
        const arr: string[] =[]
        for(let item of data.tagList){
            arr.push(item.value)
        }
        const res = await dispatch(createArticle({
            title: data.title,
            description: data.description,
            body: data.body,
            tagList: arr
        }));
        setServerErrors({});
        if(createArticle.fulfilled.match(res)){
         
            navigate(`/articles/${res.payload.slug}`)
        } else if(createArticle.rejected.match(res)){
            setServerErrors(res.payload || {});
        }
     }
     const loading = useSelector((state: RootSt) => state.create.loading)
          if(loading){
            return <Loading />
          }
    return ( 
        <div className={style.container} style={{
            height: '100%',
            width: '80%',
            
        }}>

            <p className={style.title}>Create new article</p>

            <form action="" className={style.form} onSubmit={handleSubmit(submit)}>

                <label htmlFor="title" className={style.label}>Title
                        <input type="text" {...register('title', { required: 'Title is required'})} id='title' className={style.input} placeholder="Title"/>
                        {errors.title && <span className={style.error}>{errors.title.message}</span>}
                </label>

                <label htmlFor="description" className={style.label}>Short description
                        <input type="text" {...register('description', { required: 'Description is required'})} id='description' className={style.input} placeholder="Description"/>
                        {errors.description && <span className={style.error}>{errors.description.message}</span>}
                </label>

                <label htmlFor="message" className={style.label} >Text
                        <input type="text" {...register('body', { required: 'Text is required'})} id='message' className={style.input} placeholder="Text"/>
                        {errors.body && <span className={style.error}>{errors.body.message}</span>}
                </label>
                
                <div style={{ marginBottom: '5px'}}>Tags</div>
                <div className={style.contTag}>
              <div>
                {fields.map((field, index) => (
                <label key={field.id} htmlFor="message" className={`${style.label} ${style.tagLabel}`}> 
                    <input type='text' {...register(`tagList.${index}.value`)} id='message' className={ style.tags} placeholder="Text"/>
                    <button className={style.deleteBtn} type='button' onClick={() => remove(index)}>Delete</button>    
                  
                </label>
                ))}
                </div>
               <button className={style.addBtn}  type='button' onClick={() => append({value: ''})}>Add</button>
               </div>
               {serverErrors?.errors && <span className={style.error}>{serverErrors.errors.body}</span>}
               
                <button className={style.submit} style={{marginBottom: '20px'}}>Send</button>

            </form>

        </div>
     );
}
 
export default CreateArticle;