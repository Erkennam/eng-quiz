import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "./auth/register";
import axios from './axios.js';

export interface profile extends User {
    _id: string,
    score: number,
    level: number,
    image: string,
}

export interface initialStateType{
    profile: profile | null,
    auth: boolean,
}


export const registerUser:any = createAsyncThunk(
    'auth/register',
    async(body)=>{
        try{
          await axios.post('/auth/register',body);
        } catch (err) {
            console.log(err);
        }
    }
)

export const loginAndFetchProfile:any = createAsyncThunk(
    'auth/loginAndFetchProfile',
    async ({ email, password }:User, { rejectWithValue }) => {
      try {
        const loginResponse = await axios.post('/auth/login', { email, password });
        const { token } = loginResponse.data;
        localStorage.setItem('token', token);
        const profileResponse = await axios.get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return { token, profile: profileResponse.data };
      } catch (error:any) {
        return rejectWithValue(error.response.data.message || 'Ошибка авторизации или получения профиля');
      }
    }
);

export const fetchProfile: any = createAsyncThunk(
  'auth/fetchProfile',
  async ()=> {
    try{
      const token = localStorage.getItem('token');
      const profileResponse = await axios.get('/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return profileResponse.data;
    } catch (err){
      console.log(err);
    }
  }
)

export const nextLevel: any = createAsyncThunk(
  '/levels/nextLevel',
  async (id:string)=>{
      try{
          const resp = await axios.patch('/levels/nextLevel',{id});
          return resp.data;
      } catch (err) {
          console.log(err);
      }
  }
)

export const recorderNew: any = createAsyncThunk(
  '/users/record',
  async ({id,score = false,endless = false}:{id:string,score:number|boolean,endless:number|boolean})=>{
    try{
      const resp = await axios.patch('/auth/record',{id,score,endless});
      return resp.data.user;
    } catch (err) {
      console.log(err);
    }
  }
)

export const patchImage:any = createAsyncThunk(
  '/users/image',
  async({id,image}:{id: string, image: string})=>{
    try{
      const resp = await axios.patch(`/auth/setImage/${id}`,{image});
      console.log(resp);
      return resp.data.update;
    } catch (err) {
      console.log(err);
    }
  }
)

const initialState:initialStateType = {
    profile: null,
    auth: false,
}

const AuthSlice:any = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder)=>{
        builder.addCase(loginAndFetchProfile.fulfilled,(state,{payload})=>{
            state.auth = true;
            state.profile = payload.profile;
        })
        .addCase(nextLevel.fulfilled, (state,{payload})=>{
          state.profile = payload;
        })
        .addCase(fetchProfile.fulfilled, (state,{payload})=>{
          state.auth = true;
          state.profile = payload;
        })
        .addCase(recorderNew.fulfilled, (state,{payload})=>{
          state.profile = payload;
        })
        .addCase(patchImage.fulfilled, (state,{payload})=>{
          state.profile = payload;
        })
    }
})

export default AuthSlice.reducer;