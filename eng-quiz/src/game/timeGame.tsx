import React, { FC, useEffect, useState } from "react";
import Menu from "../main/menu";
import LinearProgress from '@mui/material/LinearProgress';
import { useGetLevels } from "../hooks/useGetLevels";
import LoaderComponent from "../component/loading";
import CheckIcon from '@mui/icons-material/Check';
import { word } from "../levelTypes";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import { recorderNew } from "../AuthSlice";
import { motion,AnimatePresence} from "framer-motion";
import Confetti from 'react-confetti';
import { useWindowSize } from "react-use";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../store";

const TimeGame:FC = ()=>{
    const [second,setSecond] = useState<number>(0);
    const [currentWord,setCurrentWord] = useState<number>(0);
    const {profile}:any = useSelector((state:RootState)=> state.Auth);
    const [findWord,setFindWord] = useState<string>('');
    const { width, height } = useWindowSize();
    const [complete,setComplete] = useState<boolean>(false);
    const [record,setRecord] = useState<boolean>(false);
    const [confetti,setConfetti] = useState<boolean>(false);
    const {loading,shuffleLevels} = useGetLevels();
    const dispatch = useDispatch();
    const [randomLevels, setRandomLevels] = useState<word[]>([]);
    const fetchRecord = async()=>{
        try{
            if (profile && currentWord > profile.score) {
                await dispatch(recorderNew({id: profile._id, score: currentWord}));
                setRecord(true);
                setConfetti(true);
                setTimeout(()=>{setConfetti(false)},5000);
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(()=>{
        setRandomLevels(shuffleLevels());
    },[shuffleLevels])
    let timer:any;
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;
        if (second < 60 && !complete) {
          timer = setInterval(() => {
            setSecond((prev) => prev + 1);
          }, 1000);
        } else if (second >= 60) {
          setComplete(true);
          fetchRecord();
        }
    
        return () => {
          if (timer) clearInterval(timer);
        };
    }, [second, complete]);
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setFindWord(e.target.value);
    }
    const currentLevel = randomLevels[currentWord] || {english: '',russian: ''};
    const replay = ()=>{
        setFindWord('');
        setRandomLevels(shuffleLevels());
        setSecond(0);
        setCurrentWord(0);
        setComplete(false);
    }
    const endGame = ()=>{
        setComplete(true);
        setSecond(0);
        clearInterval(timer);
    }
    const checkWord = () => {
        if (currentLevel.russian && findWord.toLowerCase().trim() === currentLevel.russian.toLowerCase()) {
            setFindWord('');
            setCurrentWord((prev) => prev + 1);
        }
    };
    useEffect(()=>{
        checkWord();
    },[findWord])
    const progressValue = (second / 60) * 100;
    if(loading){
        return <LoaderComponent></LoaderComponent>
    }
    if(!currentLevel){
        return <p>wedfgty</p>
    }
    return(
        <div className="w-full h-full flex flex-col gap-24 items-center">
            {confetti && <Confetti width={width} height={height} />}
            <div className="w-full">
                <Menu></Menu>
                <LinearProgress variant='determinate' color="secondary" value={progressValue}></LinearProgress>
            </div>
            <div className="w-1/3 h-1/2 border-2 rounded-lg shadow-md flex flex-col items-center gap-15">
                {!complete ?
                    <div className="flex flex-col gap-8 items-center w-full h-full">
                    <div className="w-full h-1/5 flex border-b-2 p-2 px-4 justify-between items-center">
                        <button onClick={endGame}><CloseIcon></CloseIcon></button>
                        <div className="text-2xl font-medium flex gap-4 items-end">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={currentWord}
                                    className="text-2xl font-medium"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {currentWord}
                                </motion.p>
                            </AnimatePresence>
                            <CheckIcon className="text-green-500"></CheckIcon>
                        </div>
                    </div>
                       <div className="w-full mt-6 flex justify-center flex-col gap-7 items-center">
                       <AnimatePresence mode="wait">
                            <motion.p
                                key={currentWord}
                                className="text-2xl font-medium"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {currentLevel.english}
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
                        {profile && record && <p className="text-2xl font-medium">новый рекорд</p>}
                        <p className="text-2xl font-medium">ваш результат {currentWord}</p>
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

export default TimeGame;