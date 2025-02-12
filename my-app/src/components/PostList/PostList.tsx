import React, { useEffect, useState} from "react";
import Post from "../Post/Post";
import './postList.css';
import { useDispatch, useSelector } from "react-redux";
import { ConfigProvider, Pagination } from "antd";
import { RootSt } from "../../redux/store";
import { AppDispatch } from "../../redux/store";
import { getArticles } from "../../redux/getArticles";
import Loading from "../Loading/Loading";

const PostList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [currentPage, setCurrentPage] = useState(1)
    const articles = useSelector((state: RootSt) => state.articles.articles) as Article[];
    const count= useSelector((state: RootSt) => state.articles.articlesCount);
    useEffect(() => {
        dispatch(getArticles({ page: currentPage, limit: 20}))
    }, [dispatch, currentPage])
  const loading = useSelector((state: RootSt) => state.articles.loading)
  if(loading){
    return <Loading />
  }
    return ( 
        <div className="post-list-container"> 
         {articles.map((article) => (       
                <Post key={article.slug} article={article} />
            ))}
          <ConfigProvider
  theme={{
    components: {
      Pagination: { 
       
       itemBg:'inherit',
       colorBgTextActive: 'black'
      },
    },
  }}
>
<Pagination
   current={currentPage}
   total={count+Number('0')}
    align="center"
   onChange={(page) => setCurrentPage(page)}
    style={{ marginBottom: "10px"
     }}/>
</ConfigProvider> 
        </div>
     );
}
 
export default PostList;