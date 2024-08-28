import { useCallback, useEffect } from "react";
import { fetchProfile } from "../AuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useRelog = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fetchData = useCallback(async ()=>{
        try{
            const token = localStorage.getItem('token');
            if(token){
                dispatch(fetchProfile());
            } else {
                navigate('/Login');
            }
        } catch (err) {
            console.log(err);
            navigate('/Login');
        }
    },[dispatch,navigate]);
    useEffect(()=>{
        fetchData();
    },[fetchData]);
    return {fetchData};
}