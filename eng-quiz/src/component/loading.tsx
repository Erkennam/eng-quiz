import React, { FC } from "react";
import { CircularProgress } from "@mui/material";

const LoaderComponent:FC = ()=>{
    return(
        <div className="w-full h-full bg-gray-400 bg-opacity-40 flex justify-center items-center">
            <div className="w-1/6 p-4 px-6 bg-white rounded-md flex gap-10 items-center shadow-md">
                <CircularProgress color="secondary"></CircularProgress>
                <p className="text-xl">Загрузка...</p>
            </div>
        </div>
    )
}

export default LoaderComponent;