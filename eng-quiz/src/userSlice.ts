import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { profile } from "./AuthSlice";
import axios from './axios';

interface initialState {
    leaders: profile[],
    rank: null | number,
}

export const getLeaders:any = createAsyncThunk(
    '/users/leaders',
    async({score,id}:{score: number, id: string})=>{
        try{
            const resp = await axios.get('/auth/leaders',{
                headers: {
                    score,
                    id
                }
            })
            console.log(resp);
            return { leaders: resp.data.leaders, yourRank: resp.data.yourRank };;
        } catch (err) {
            console.log(err);
        }
    }
)

const initialState:initialState = {
    leaders: [],
    rank: null,
}

const userSlice:any = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getLeaders.fulfilled, (state,{payload}:any)=>{
            state.leaders = payload.leaders || [];
            state.rank = payload.yourRank || null
        })
    }
})

export default userSlice.reducer;