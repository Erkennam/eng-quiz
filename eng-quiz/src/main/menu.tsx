import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setProfileModal } from "../Slice";
import { Link } from "react-router-dom";

const Menu:FC = ()=>{
    const {auth,profile}:any = useSelector((state:RootState | any)=> state.Auth);
    const dispatch = useDispatch();
    const openModal = ()=>{
        dispatch(setProfileModal());
    }
    return(
        <div className="w-full p-6 px-12 border-b-2 flex justify-between items-center">
            <Link to={'/'}>
                <h1 className="text-2xl font-medium">Eng-Rus</h1>
            </Link>
            <div className="flex gap-8 items-center"> 
                {!auth ? <div className="flex gap-8">
                    <Link to={'/login'}>
                        <button className="p-2 px-3 bg-[#f6f0ff] text-[#6e59b1] text-lg rounded-lg transition duration-200 hover:bg-[#e9dcfc]">авторизоваться</button>
                    </Link>
                    <Link to={'/register'}>
                        <button className="p-2 px-3 bg-indigo-600 text-white text-lg rounded-lg transition duration-200 hover:bg-opacity-80">регистрация</button>
                    </Link>
                </div> : <>
                    <button className="p-2 px-3 bg-[#f6f0ff] text-[#6e59b1] text-lg rounded-lg transition duration-200 hover:bg-[#e9dcfc]">выход из аккаунта</button>
                </>}
               <Link to={'/leaderboard'}>
                    <button className="p-2 px-3 bg-[#f6f0ff] text-[#6e59b1] text-lg rounded-lg transition duration-200 hover:bg-[#e9dcfc]">
                        Таблица игроков
                    </button>
               </Link>
               <img onClick={openModal} className="w-10 h-10 object-cover rounded-full " src={profile.image}></img>  
            </div>
        </div>
    )
}

export default Menu;