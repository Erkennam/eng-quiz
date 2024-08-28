import React, { FC } from "react";
import { RootState, useTypedSelector } from "../store";
import ProfileImage from "./profileImage";

const Dark:FC = ()=>{
    const {profileImage}:any = useTypedSelector((state:RootState) => state.Slice);
    return(
        <div className="w-full h-full bg-black bg-opacity-50 fixed flex justify-center items-center z-50">
            {profileImage && <ProfileImage></ProfileImage>}
        </div>
    )
}

export default Dark;