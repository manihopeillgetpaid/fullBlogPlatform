import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header/Header";
import HeaderLoggedIn from "../HeaderLoggedIn/HeaderLoggedIn";
import PostList from "../PostList/PostList";
import SignInAccount from "../SignInAccount/SignInAccount";
import SignUpAccount from "../SignUpAccount/SignUpAccount";
import EditAccount from "../EditAccount/EditAccount";
import CreateArticle from "../CreateArticle/CreateArticle";
import PostDetail from "../PostDetail/PostDetail";
import "./app.css";
import { AppDispatch, RootSt } from "../../redux/store";
import { getUserData } from "../../redux/authSlice";
import DeleteArticle from "../DeleteArticle/DeleteArticle";
import EditArticle from "../EditArticle/EditArticle";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const App: React.FC = () => {

 const dispatch = useDispatch<AppDispatch>()
 const token = useSelector((state: RootSt) => state.auth.token);
 useEffect(() => { 
    if(token){
      dispatch(getUserData({token}));
    }
  }, [dispatch, token])
  const isAuthenticated = Boolean(token);

  return (
    <>
      {isAuthenticated ? <HeaderLoggedIn /> : <Header />}
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="sign-in" element={<SignInAccount />} />
        <Route path="sign-up" element={<SignUpAccount />} />
        <Route path="articles" element={<PostList />} />
        <Route path="articles/:slug" element={<PostDetail />} />
        <Route element={<PrivateRoute/>}>
            <Route path="profile" element={<EditAccount />} />
            <Route path="new-article" element={<CreateArticle />} />
            <Route path="articles/:slug/delete" element={<DeleteArticle/>}/>
            <Route path="articles/:slug/edit" element={<EditArticle/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
