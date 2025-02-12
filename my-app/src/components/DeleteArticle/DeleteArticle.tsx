import React, { useState } from "react";
import './deleteArticle.css';
import style from '../modules/sign.module.css'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootSt } from "../../redux/store";
import { deleteArticle } from "../../redux/createArticle";
import Loading from "../Loading/Loading";

const DeleteArticle: React.FC = () => {
    const navigate = useNavigate();
    const { slug } = useParams<{ slug: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const [serverErrors, setServerErrors] = useState<ServerErrorsArticle | null>(null)
    const handledDelete = async () => {
        if(!slug) return;
        const res = await dispatch(deleteArticle(slug));
        console.log(res);
        if(deleteArticle.fulfilled.match(res)){
           await navigate('/articles');
        }
        else if(deleteArticle.rejected.match(res)){
          setServerErrors(res.payload || {})  
        }
    }
    const loading = useSelector((state: RootSt) => state.create.loading)
         if(loading){
           return <Loading />
         }
 return(       
        <div className="secCont">
            <p className="deleteP">Are you sure you want to delete this article?</p>
            <button type="button" className="agreeBtn delBtn" onClick={handledDelete}>Yes</button>
            {serverErrors?.errors && <span className={style.error}>{serverErrors.errors.body}</span>}
            <button className="noBtn delBtn" onClick={() => navigate(`/articles/${slug}`)}>No</button>
        </div>
        )
}
 
export default DeleteArticle;