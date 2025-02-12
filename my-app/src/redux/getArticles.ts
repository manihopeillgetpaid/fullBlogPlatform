import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootSt } from "./store";

export const getArticles = createAsyncThunk<{articles: Article[], total: number}, {page: number, limit: number}, { rejectValue: string }>(
    'getArticlesSlice/getArticles',
    async ({ page, limit }, thunkAPI) => {
        try{
            const offset = (page - 1) * limit;
            const res = await fetch(`https://blog-platform.kata.academy/api/articles?offset=${offset}&limit=${limit}`);
            if(!res.ok){
                throw new Error('errrooooorr')
            }
            const data = await res.json();
          
            return{articles: data.articles, total: data.articlesCount}
        }
        catch(e){
   
            return thunkAPI.rejectWithValue('Failed to fetch articles');
        }

    }
)
export const toggleFavorite = createAsyncThunk<
    { slug: string; favorited: boolean; favoritesCount: number },
    { slug: string; favorited: boolean },
    { state: RootSt; rejectValue: string }
>(
    "articles/toggleFavorite",
    async ({ slug, favorited }, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            if (!token) return rejectWithValue("User not authenticated");

            const method = favorited ? "DELETE" : "POST";
            const res = await fetch(
                `https://blog-platform.kata.academy/api/articles/${slug}/favorite`,
                {
                    method,
                    headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Failed to toggle favorite");
            }

            const data = await res.json();
            return {
                slug,
                favorited: data.article.favorited,
                favoritesCount: data.article.favoritesCount,
            };
        } catch (error) {
            return rejectWithValue("Failed to toggle favorite");
        }
    }
);


