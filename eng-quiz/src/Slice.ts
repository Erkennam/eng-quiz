import { createSlice } from "@reduxjs/toolkit";

interface sliceState {
    profileModal: boolean,
    dark: boolean,
    profileImage: boolean,
}

const initialState:sliceState = {  
    profileModal: false,
    dark: false,
    profileImage: false,
}

const slice:any = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        setProfileModal: (state)=>{
            state.profileModal = !state.profileModal;
        },
        setProfileImage: (state)=>{
            state.dark = !state.dark;
            state.profileImage = !state.profileImage;
        }
    }
})

export const {setProfileImage,setProfileModal} = slice.actions;
export default slice.reducer;