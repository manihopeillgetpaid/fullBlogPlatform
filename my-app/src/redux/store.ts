import { configureStore } from '@reduxjs/toolkit';
import  articlesReducer  from './getarticlesSlice';
import authReducer from './authSlice';
import articleReducer from './getFullArticle';
import createArticleReducer from './createArticle' 
const store = configureStore({
    reducer: {
        articles: articlesReducer,
        auth: authReducer,
        article: articleReducer,
        create: createArticleReducer
    },

});

export type RootSt = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;