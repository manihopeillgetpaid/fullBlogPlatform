import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState: AuthState = {
    username: '',
    email: '',
    token:  localStorage.getItem('token') || '',
    loading: false,
    error: null,
    bio: ''
};

export const registerUser = createAsyncThunk<RegisterResponce, RegisterRequest,   { rejectValue: Record<string, string[]> } >(
    'auth/registerUser',
    async (obj, thunkAPI) => {
        try{
            const res = await fetch('https://blog-platform.kata.academy/api/users', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: obj })
            });
            const result = await res.json(); 
            if (!res.ok) return thunkAPI.rejectWithValue(result.errors);
            return result.user;
        }
        catch (e) {
            return thunkAPI.rejectWithValue({ general: ["Ошибка соединения с сервером"] });
        }
    }
)

export const editProfile = createAsyncThunk<EditResponce, {obj: EditRequest, token: string},  { rejectValue: Record<string, string[]> }>(
    'auth/editProfile',
    async ({ obj, token }, thunkAPI) => {
        try{
            const res = await fetch('https://blog-platform.kata.academy/api/user',{
                method: 'PUT',
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                },
                body: JSON.stringify({user: obj})
            });
            const data = await res.json();
            if(!res.ok) return thunkAPI.rejectWithValue(data.errors);
            return data.user;
        } catch(e){
            return thunkAPI.rejectWithValue({ general: ['Ошибка соединения с сервером'] });
        }
    }
)
export const getUserData = createAsyncThunk<EditResponce,{ token: string}, { rejectValue: Record<string, string[]> }>(
    'auth/getUserData',
    async({token}, thunkAPI) =>{
        try{
            const res = await fetch("https://blog-platform.kata.academy/api/user", {
                method: 'GET',
                headers: { "Content-Type": "application/json",
                    "Authorization": `Token ${token}`
                 }
            });
            const data = await res.json();  
            if (!res.ok) return thunkAPI.rejectWithValue(data.errors);
            
            return data.user;
        }
        catch (e) {
            return thunkAPI.rejectWithValue({ general: ['Ошибка соединения с сервером'] });
        }
    }
)
export const logInUser = createAsyncThunk<RegisterResponce, LogInRequest,   { rejectValue: Record<string, string[]> }>(
    'auth/logInUser',
    async (obj, thunkAPI) => {
        try{
            const res = await fetch("https://blog-platform.kata.academy/api/users/login", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: obj })
            });
            const data = await res.json();  
            if (!res.ok) return thunkAPI.rejectWithValue(data);
            
            return data.user;
        }
        catch (e) {
            return thunkAPI.rejectWithValue({ general: ['Ошибка соединения с сервером'] });
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState, 
    reducers:{
        logout: (state) =>{
            state.email ='';
            state.username = '';
            state.token = '';
            state.error = null;
            localStorage.removeItem('token')
        }
    },
     extraReducers: (builder) => {
        builder
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.loading = false;
            localStorage.setItem('token', action.payload.token)
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? JSON.stringify(action.payload) : 'Error came up';
        })
        .addCase(logInUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(logInUser.fulfilled, (state, action) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.loading = false;
            localStorage.setItem('token', action.payload.token)
        })
        .addCase(logInUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? JSON.stringify(action.payload) : 'Error appeared'
        })
        .addCase(editProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(editProfile.fulfilled, (state, action) => {
            state.username = action.payload.username;
            state.bio = action.payload.bio;
            state.image = action.payload.image;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.loading = false;
            localStorage.setItem('token', action.payload.token)
        })
        .addCase(editProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? JSON.stringify(action.payload) : 'Error appeared'
        })
        .addCase(getUserData.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            state.username = action.payload.username;
            state.bio = action.payload.bio;
            state.image = action.payload.image;
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.loading = false;
        })
        .addCase(getUserData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload ? JSON.stringify(action.payload) : 'Error appeared'
        })
     }
})
export const { logout } = authSlice.actions;
export default authSlice.reducer