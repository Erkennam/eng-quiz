import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { level } from "./levelTypes";
import axios from './axios';

interface initialState {
    levels: level[],
    currentLevel: level | null,
    availableLevel: number | null,
}

export const getLevels:any = createAsyncThunk(
    '/levels/level',
    async ()=>{
        try{
            const resp = await axios.get('/levels');
            return resp.data;
        } catch (err) {
            console.log(err);
        }
    }
)

export const getCurrentLevel:any = createAsyncThunk(
    '/levels/getLevel',
    async (level: number)=>{
        try{
            const resp = await axios.get(`/levels/${level}`);
            return resp.data.level;
        } catch (err) {
            console.log(err);
        }
    }
)

const initialState:initialState = {
    levels: [],
    currentLevel: null,
    availableLevel: null
}

const LevelSlice:any = createSlice({
    name: 'levels',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getLevels.fulfilled,(state,{payload})=>{
            state.levels = payload;
            state.availableLevel = payload.length;
        })
        .addCase(getCurrentLevel.fulfilled, (state,{payload})=>{
            state.currentLevel = payload;
        })
    }
})

export default LevelSlice.reducer;