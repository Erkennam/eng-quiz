import { useDispatch,useSelector } from "react-redux";
import { getLeaders } from "../userSlice";
import { RootState } from "../store";
import { useEffect, useState } from "react";

export const useLeaders = ()=>{
    const dispatch = useDispatch();
    const {profile}:any = useSelector((state:RootState)=> state.Auth);
    const {leaders,rank}:any = useSelector((state:RootState)=> state.Users);
    const [loading,setLoading] = useState<boolean>(false);
    const fetchData = async ()=>{
        setLoading(true);
        try{
            await dispatch(getLeaders({score: profile.score, id: profile._id}));
        } catch (err){
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    useEffect(()=>{
        if (profile && profile.score !== undefined && profile._id) {
            fetchData();
        }
    },[profile]);
    return {fetchData,loading,leaders,rank};
}