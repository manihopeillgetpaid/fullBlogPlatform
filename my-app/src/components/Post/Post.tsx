import React from "react";
import image from '../assets/images/Vector.svg';
import './post.css';
import avatar from '../assets/images/Rectangle1.png';
import { Link } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../../redux/getArticles";

const Post: React.FC<ArticleProps> = ({ article }) => {
   const dispatch = useDispatch<AppDispatch>();
   const handleLike = () => {
    dispatch(toggleFavorite({ slug: article.slug, favorited: article.favorited}))
   }
    return (
        <div className="main-container">
            <div className="post-container">
                <div className="title">
                    <Link to={`/articles/${article.slug}`} className='title'>
                        {article.title}
                    </Link>
                    <button className={`image-container ${article.favorited ? 'liked' : ''}`} onClick={handleLike}>
                        <img className="image" src={image} alt="" />
                        {article.favoritesCount}
                    </button>
                </div>
                <div className='tagCont'>
                {article.tagList.map((tag, id) => (
                    <div className="tag" key={id}>{tag}</div>
                ))}
                </div>
                <p className="description">{article.description}</p>
            </div>
            <div className="author-container">
                <div className="con">
                    <span className="name">{article.author.username}</span>
                    <span className="birthday">{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
                <img className="avatar" src={article.author.image || avatar} alt="" />
            </div>

           
        </div>
    );
};

export default Post;
