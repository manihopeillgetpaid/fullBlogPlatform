import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootSt } from "./store";


export const createArticle = createAsyncThunk<Article, ArticleRequest, {state: RootSt, rejectValue: Record<string, string[]>}>(
    'createArticleSlice/createArticle',
    async (obj, {getState, rejectWithValue}) => {
        try{
            const token = getState().auth.token;
            if(!token) return rejectWithValue({ general: ['User is not auth'] });
            const res = await fetch(`https://blog-platform.kata.academy/api/articles`,{
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({article: obj})
            });
            const data = await res.json();
            if(!res.ok){
                if (!res.ok) return rejectWithValue(data);
            }

           
            return data.article
        } catch(e){
            return rejectWithValue({ general: ['Ошибка соединения с сервером'] })
        }
    }
) 

export const deleteArticle = createAsyncThunk<void, string, {state: RootSt, rejectValue: Record<string, string[]>}>(
    'createArticleSlice/deleteArticle',
    async (slug, {getState, rejectWithValue}) => {
        try{
            const token = getState().auth.token;
            
            if(!token) return rejectWithValue({ general: ['User is not auth'] });
            const res = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`,{
                method: "DELETE",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                }
            });
            
            if (res.ok) {
                if (res.status === 204) {
                    return;
                }
                const data = await res.json();
                return data;
            }
           const errorData = await res.json();
            return rejectWithValue(errorData);
        } catch(e){
            return rejectWithValue({ general: ['Ошибка соединения с сервером'] })
        }
    }
) 

export const editArticle = createAsyncThunk<Article, Partial<ArticleRequest>, {state: RootSt, rejectValue: Record<string, string[]>}>(
    'createArticleSlice/editArticle',
    async (obj, {getState, rejectWithValue}) => {
        try{
            const token = getState().auth.token;
            if(!token) return rejectWithValue({ general: ['User is not auth'] });
            const slug = getState().article.article?.slug;
            const res = await fetch(`https://blog-platform.kata.academy/api/articles/${slug}`,{
                method: "PUT",
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({article: obj})
            });
            const data = await res.json();
            if(!res.ok){
                if (!res.ok) return rejectWithValue(data);
            }

           
            return data.article
        } catch(e){
            return rejectWithValue({ general: ['Ошибка соединения с сервером'] })
        }
    }
) 

const initialState: { article: Article | null, error: string | null, loading: boolean} = {
   article: null,
   loading: false,
   error: null
}

const createArticleSlice = createSlice({
    name: 'create',
    initialState,
    reducers: {

    },
    extraReducers: (builder) =>{
        builder
        .addCase(createArticle.fulfilled, (state, action) => {
          state.loading = false;
          state.article = action.payload
        })
        .addCase(createArticle.rejected,(state, action) => {
            state.loading= false;
            state.error = JSON.stringify(action.payload) || "Failed to create an article";
        })
        .addCase(createArticle.pending,(state, action) => {
            state.loading= true;
            state.error = null;
        })
        .addCase(editArticle.fulfilled, (state, action) => {
            state.loading = false;
            state.article = action.payload
        })
        .addCase(editArticle.rejected,(state, action) => {
              state.loading= false;
              state.error = JSON.stringify(action.payload) || "Failed to create an article";
        })
        .addCase(editArticle.pending,(state, action) => {
              state.loading= true;
              state.error = null;
        })
        .addCase(deleteArticle.fulfilled, (state, action) => {
            state.loading = false;
           
        })
        .addCase(deleteArticle.rejected,(state, action) => {
              state.loading= false;
              state.error = JSON.stringify(action.payload) || "Failed to delete an article";
        })
        .addCase(deleteArticle.pending,(state, action) => {
              state.loading= true;
              state.error = null;
        })
    }
})
export default createArticleSlice.reducer;