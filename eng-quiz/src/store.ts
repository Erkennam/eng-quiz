import {configureStore} from '@reduxjs/toolkit';
import { TypedUseSelectorHook,useSelector } from 'react-redux';
import AuthSlice from './AuthSlice';
import LevelsSlice from './levelsSlice';
import userSlice from './userSlice';
import Slice from './Slice';

export const Store = configureStore({
    reducer: {
        Auth: AuthSlice,
        Level: LevelsSlice,
        Users: userSlice,
        Slice: Slice,
    }
})

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;