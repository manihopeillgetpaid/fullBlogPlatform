import React, { useState } from "react";
import style from '../modules/sign.module.css'
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootSt } from "../../redux/store";
import { editArticle } from "../../redux/createArticle";
const EditArticle: React.FC = () => {
    const article = useSelector((state: RootSt) => state.article?.article);
    const { title, description, body, tagList } = article || {};
    const defaultTags = tagList?.map(tag => ({value: tag})) || [];
    const {register, handleSubmit,control, formState: {errors}} = useForm<EditArticleForm>({
        defaultValues: { 
            title: title,
            description: description,
            body: body,
            tagList: defaultTags
         }
      });
      const dispatch = useDispatch<AppDispatch>();
      const navigate = useNavigate();
      const { fields, append, remove} = useFieldArray({control, name: "tagList" });
      const [serverErrors, setServerErrors] = useState<ServerErrorsArticle | null>(null);
      const submit: SubmitHandler<Partial<EditArticleForm>> = async (data) =>{
        const formattedTags = data.tagList?.map(tag => 
            typeof tag === 'string' ? tag : tag.value
          );
             
              const res = await dispatch(editArticle({
                  title: data.title,
                  description: data.description,
                  body: data.body,
                  tagList: formattedTags
              }));
              setServerErrors({});
              if(editArticle.fulfilled.match(res)){
               
                  navigate(`/articles/${res.payload.slug}`)
              } else if(editArticle.rejected.match(res)){
                  setServerErrors(res.payload || {});
              }
           }
           
    return ( 
          <div className={style.container} style={{
                    height: '100%',
                    width: '80%',
                    
                }}>
        
                    <p className={style.title}>Edit article</p>
        
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
 
export default EditArticle;