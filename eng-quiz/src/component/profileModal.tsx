import React, { FC, useEffect, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setProfileModal,setProfileImage } from "../Slice";
import { RootState } from "../store";
import CloseIcon from '@mui/icons-material/Close';
import BarChartIcon from '@mui/icons-material/BarChart';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import { profile } from "../AuthSlice";

const ProfileModal:FC = ()=>{
    const dispatch = useDispatch();
    const ref = useRef<null | HTMLDivElement>(null);
    const {profile}:profile | any = useSelector((state:RootState)=> state.Auth);
    const closeModal = ()=>{
        dispatch(setProfileModal());
    }
    const openImageModal = ()=>{
        dispatch(setProfileImage());
    }
    useEffect(()=>{
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                closeModal();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[dispatch,ref])
    return(
        <div ref={ref} className="w-1/4 h-3/5 bg-white shadow-xl fixed top-20 right-4 z-10 border-2 rounded-xl">
            <div className="py-4 px-4 flex border-b-2 items-center justify-between">
                <p className="text-2xl font-medium">{profile.username}</p>
                <button className=" transition duration-150 hover:text-red-500" onClick={closeModal}><CloseIcon></CloseIcon></button>
            </div>
            <div className="py-4 flex items-center justify-center">
                <div className="flex items-end justify-center p-2">
                    <img src={profile.image} className="w-1/3 h-1/3 rounded-full"></img>
                    <button onClick={openImageModal} className=" transition duration-150 hover:text-indigo-500"><CreateIcon></CreateIcon></button>
                </div>
            </div>
            <div className="flex flex-col gap-4 px-4">
                <button className="text-xl flex gap-3 items-end py-2 px-4 border-2 rounded-md transition duration-150 hover:text-red-500">
                    <LogoutIcon></LogoutIcon>
                    выход из аккаунта
                </button>
                <button className="text-xl flex gap-3 items-end py-2 px-4 border-2 rounded-md transition duration-150 hover:text-indigo-400">
                    <BarChartIcon></BarChartIcon> 
                    статистика
                </button>
            </div>
        </div>
    )
}

export default ProfileModal;