import { createSlice } from "@reduxjs/toolkit";
import { getArticles, toggleFavorite } from "./getArticles";

const initialState: ArticleResponce = {
    articles: [],
    articlesCount: 1,
    loading: false
}

const getArticlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getArticles.pending, (state) => {
          state.loading = true;
        })
          .addCase(getArticles.fulfilled, (state, action) => {
            state.articles = action.payload.articles;
            state.articlesCount = action.payload.total
            state.loading = false;
          })
          .addCase(getArticles.rejected, (state, action) => {
            state.loading = false
            console.error("Failed to fetch articles:", action.payload);
          })
          .addCase(toggleFavorite.fulfilled, (state, action) => {
            const article = state.articles.find(a => a.slug === action.payload.slug );
            if(article){
                article.favorited = action.payload.favorited;
                article.favoritesCount = action.payload.favoritesCount
            }
            state.loading= false;
          })
          .addCase(toggleFavorite.rejected, (state, action) => {
            state.loading = false
            console.error("Failed to fetch articles:", action.payload);
          })
          .addCase(toggleFavorite.pending, (state) => {
            state.loading = true;
          })
      
      }
})

export default getArticlesSlice.reducer;