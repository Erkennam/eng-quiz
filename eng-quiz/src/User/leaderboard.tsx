import React, { FC } from "react";
import Menu from "../main/menu";
import CloseIcon from '@mui/icons-material/Close';
import { useLeaders } from "../hooks/useLeaders";
import { profile } from "../AuthSlice";
import { Link } from "react-router-dom";
import LoaderComponent from "../component/loading";

const Leaderboard:FC = ()=>{
    const {leaders,loading} = useLeaders();
    if(loading){
        return <LoaderComponent></LoaderComponent>
    }
    return(
        <div className="w-full h-full flex flex-col items-center gap-20 overflow-hidden">
            <Menu></Menu>
                <div className="w-1/3 h-3/5 border-2 rounded-lg">
                    <div className="w-full flex py-4 px-8 justify-between border-b-2">
                        <p className="text-xl font-medium">Лучшие Игроки</p>
                        <Link to={'/'}><button><CloseIcon></CloseIcon></button></Link>
                    </div>
                    <div className="w-full h-full relative">
                        {leaders.map((el:profile,i:number)=>{
                            return(
                                <div className="py-3 border-b-2 px-8 flex justify-between items-center" key={el._id}>
                                    <div className="flex gap-5 items-center">
                                        <img className="w-12 h-12 object-cover rounded-full " src={el.image}></img>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-xl font-medium">{el.username}</p>
                                            <p>Очки: {el.score}</p>
                                        </div>
                                    </div>
                                    <p className="text-2xl font-medium">{i + 1}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
        </div>
    )
}

export default Leaderboard;