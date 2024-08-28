import React, { FC, useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { motion,AnimatePresence} from "framer-motion";
import { useGetLevels } from "../hooks/useGetLevels";
import Menu from "../main/menu";
import { useDispatch,useSelector } from "react-redux";
import { recorderNew } from "../AuthSlice";
import CloseIcon from '@mui/icons-material/Close';
import { LinearProgress } from "@mui/material";
import { word } from "../levelTypes";
import Confetti from 'react-confetti';
import { useWindowSize } from "react-use";
import CheckIcon from '@mui/icons-material/Check';
import { RootState } from "../store";

const EndlessGame:FC = ()=>{
    const [second,setSecond] = useState<number>(20);
    const [complete,setComplete] = useState<boolean>(false);
    const [randomLevels,setRandomLevels] = useState<word[]>([]);
    const [findWord,setFindWord] = useState<string>('');
    const [showConfetti, setShowConfetti] = useState<boolean>(false);
    const { width, height } = useWindowSize();
    const [record,setNewRecord] = useState<boolean>(false);
    const [current,setCurrent] = useState<number>(0);
    const {shuffleLevels} = useGetLevels();
    const dispatch = useDispatch();
    const {profile}:any = useSelector((state:RootState)=> state.Auth);
    const navigate = useNavigate();
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFindWord(e.target.value);
    }
    const fetchRecord = async ()=>{
        if(current > profile.endless){
            await dispatch(recorderNew({id: profile._id, endless: current}));
            setNewRecord(true);
            setShowConfetti(true);
            setTimeout(()=>{setShowConfetti(false)},5000);
        }
    }
    useEffect(()=>{
        setRandomLevels(shuffleLevels);
    },[shuffleLevels]);
    const currentWord:word = randomLevels[current] || {english: '',russian: ''};
    const checkWord = ()=>{
        if (currentWord.russian && findWord.toLowerCase().trim() === currentWord.russian.toLowerCase()) {
            setFindWord('');
            setCurrent((prev:number) => prev + 1);
            setSecond((prev)=> prev + 3);
        }
    }
    const replay = ()=>{
        setSecond(20);
        setComplete(false);
        setFindWord('');
        setRandomLevels(shuffleLevels());
        setCurrent(0);
    }
    const exitGame = ()=>{
        navigate('/')
    }
    useEffect(()=>{
        checkWord();
    },[findWord]);
    let timer:any;
    const reduce = Math.max(0.1,Math.min((current) / 200, 0.2));
    useEffect(()=>{
        if(second > 0){
            timer = setInterval(()=>{
                setSecond((prev)=> prev - reduce);
            },100);
        } else {
            setComplete(true);
            fetchRecord();
        }
        return ()=>{ 
            clearInterval(timer);
        } 
    },[second]);
    const progressValue = Math.min((second / 20) * 100, 100);
    return (
        <div className="w-full h-full flex flex-col gap-24 items-center">
            {showConfetti && <Confetti width={width} height={height} />}
            <div className="w-full">
                <Menu></Menu>
                <LinearProgress variant='determinate' color="secondary" value={progressValue}></LinearProgress>
            </div>
            <div className="w-1/3 h-1/2 border-2 rounded-lg shadow-md flex flex-col items-center gap-15">
                {!complete ?
                    <div className="flex flex-col gap-8 items-center w-full h-full">
                    <div className="w-full h-1/5 flex border-b-2 p-2 px-4 justify-between items-center">
                        <button onClick={exitGame}><CloseIcon></CloseIcon></button>
                        <div className="text-2xl font-medium flex gap-4 items-end">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={current}
                                    className="text-2xl font-medium"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {current}
                                </motion.p>
                            </AnimatePresence>
                            <CheckIcon className="text-green-500"></CheckIcon>
                        </div>
                    </div>
                       <div className="w-full mt-6 flex justify-center flex-col gap-7 items-center">
                       <AnimatePresence mode="wait">
                            <motion.p
                                key={current}
                                className="text-2xl font-medium"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {currentWord.english}
                            </motion.p>
                        </AnimatePresence>
                        <input
                            value={findWord} 
                            className="w-2/3 rounded-md outline-none px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                            type="text" 
                            onChange={handleChange}>
                        </input>
                       </div>
                    </div>
                : <AnimatePresence mode="wait">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className='w-full h-full flex flex-col gap-6 items-center justify-center'>
                        {record && <p className="text-2xl font-medium">новый рекорд</p>}
                        <p className="text-2xl font-medium">ваш результат {current}</p>
                        <Link to={'/'} className="w-2/3 flex justify-center">
                            <button className=" w-full bg-indigo-600 text-white p-2 rounded-lg text-lg font-medium">перейти на главную </button>
                        </Link>
                        <button onClick={replay} className="w-2/3 bg-indigo-600 text-white p-2 rounded-lg text-lg font-medium">попробовать снова</button>
                    </motion.div>
                </AnimatePresence>}
            </div>
        </div>
    )
} 

export default EndlessGame;