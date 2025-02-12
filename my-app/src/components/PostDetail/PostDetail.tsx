import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import image from '../assets/images/Vector.svg';
import rehypeRaw from 'rehype-raw';
import avatar from '../assets/images/Rectangle1.png';
import './postDetail.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootSt } from '../../redux/store';
import { toggleFavorite } from '../../redux/getArticles';
import { getFullArticle } from '../../redux/getFullArticle';
import Loading from '../Loading/Loading';

const PostDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const auth = useSelector((state: RootSt) => state.auth.username);
    const author = useSelector((state: RootSt) => state.article.article?.author.username);
    const dispatch = useDispatch<AppDispatch>();
    const article = useSelector((state: RootSt) => state.article.article);
    useEffect(() => {
        console.log('im here');
        if(!slug) return;
       dispatch(getFullArticle({slug: slug}))
        console.log('and here');
        console.log(slug);
    }, [dispatch, slug]);
    const loading = useSelector((state: RootSt) => state.articles.loading)
   
    const handleLike = async () => {
   
      if( !article) return;
    return await dispatch(toggleFavorite({slug: article.slug, favorited: article.favorited}));

    }

    if (!article) return <p style={{margin: '10px'}}>Something is wrong</p>;
    if(loading){
        return <Loading />
      }
    return (
        <div className="main-container">
            <div className="post-container">
                <div className="title" >
                    <Markdown className='md' remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} >
                        {article.title}
                    </Markdown>
                    <button className={`image-container ${article.favorited ? 'liked' : ''}`} onClick={handleLike}>
                        <img className="image" src={image} alt="" />
                        {article.favoritesCount}
                    </button>
                </div>
                {article.tagList.map((tag, id) => (
                    <span className="tag" key={id}>
                        {tag}
                    </span>
                ))}
                <div className="description">
                    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                        {article.description}
                    </Markdown>
                </div>
                <div className="body">
                <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                    {article.body}
                </Markdown>
            </div>
            </div>
            <div>
            <div className="author-container">
                <div className="con">
                    <span className="name" style={{ margin: 0}}>{article.author.username}</span>
                    <span className="birthday">{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>
                <img className="avatar" src={article.author.image || avatar} alt="" />
                </div>
                <div>{auth === author ? (
                    <div className="btnContainer">
                    <Link to={`/articles/${slug}/delete`} className='noBtn postBtn'>delete</Link>
                    <Link to={`/articles/${slug}/edit`} className='agreeBtn postBtn'>edit</Link>
                    </div>
                ) : null}
                </div>
            </div>
         
        </div>
    );
};

export default PostDetail;

// edit and delete