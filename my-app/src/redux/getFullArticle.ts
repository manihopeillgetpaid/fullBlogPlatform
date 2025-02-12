import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { toggleFavorite } from "./getArticles";

export const getFullArticle = createAsyncThunk<
    { article:  Article},
    { slug: string },
    { rejectValue: string }
>(
    "articles/getFullArticle",
    async ({slug}, thunkAPI ) => {
        try {
            const res = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`);
            if (!res.ok) throw new Error("Ошибка загрузки статьи")

            const data = await res.json();
            return {
                article: data.article
            }
        } catch (error) {
            return thunkAPI.rejectWithValue("Failed to load article");
        }
    }
);

const initialState: {article: Article | null, loading: boolean} = {
article: null,
loading: false
}

const getArticlesSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getFullArticle.fulfilled, (state, action) => {
            state.article = action.payload.article;
            state.loading = false;
        })
        .addCase(getFullArticle.rejected, (state, action) => {
            state.loading = false;
            console.error(action.payload);
        })
        .addCase(getFullArticle.pending, (state, action) => {
            state.loading = true;
           
        })
        .addCase(toggleFavorite.fulfilled, (state, action) => {
            if (state.article && state.article.slug === action.payload.slug) {
                state.article.favorited = action.payload.favorited;
                state.article.favoritesCount = action.payload.favoritesCount;
            }
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