import React, { FC, useEffect, useState } from "react";
import { word } from "../levelTypes";
import { nextLevel, profile } from "../AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetLevels } from "../hooks/useGetLevels";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RootState } from "../store";
import { AnimatePresence,motion } from "framer-motion";
import LoaderComponent from "../component/loading";
import Menu from "../main/menu";

const GameLevel: FC = () => {
    const { currentLevel, fetchCurrentLevel,levelLoading } = useGetLevels();
    const profile: profile = useSelector((state: RootState | any) => state.Auth.profile);
    const maxLevelAvailable: number = useSelector((state: RootState | any) => state.Level.availableLevel);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [current, setCurrent] = useState<number>(0);
    const [findWord, setFindWord] = useState<string>('');
    const [completed, setCompleted] = useState<boolean>(false);
    useEffect(() => {
        if (!currentLevel?.words) {
            fetchCurrentLevel(Math.min(Number(id), maxLevelAvailable));
        }
    }, [currentLevel, maxLevelAvailable, fetchCurrentLevel]);
    const hiddenWord: word = currentLevel?.words[current];
    const checkWord = () => {
        if (findWord.toLowerCase().trim() === hiddenWord?.russian.toLowerCase()) {
            if (current < currentLevel.words.length - 1) {
                setCurrent((prev) => prev + 1);
                setFindWord('');
            } else {
                setCompleted(true);
            }
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFindWord(e.target.value);
    };
    const updateLevel = async () => {
        try {
            await dispatch(nextLevel(profile._id));
        } catch (error) {
            console.log('Ошибка при обновлении уровня', error);
        }
    };
    const getNextLevel = async () => {
        setFindWord('');
        setCurrent(0);
        await updateLevel();
        await fetchCurrentLevel(Math.min(Number(id) + 1, maxLevelAvailable));
        setCompleted(false);
        navigate(`/level/${Number(id) + 1}`)
    };
    useEffect(() => {
        if (current >= currentLevel?.words.length) {
            updateLevel();
            setCompleted(true)
            return;
        }
        checkWord();
    }, [findWord, current, currentLevel]);
    if (!currentLevel?.words || !profile) {
        return <p>уровень не найден</p>;
    }
    if(levelLoading){
        return <LoaderComponent></LoaderComponent>
    }
    return (
        <div className="w-full h-full flex flex-col gap-24 items-center">
            <Menu></Menu>
            <div className="w-1/3 h-1/2 border-2 rounded-md">
                <div className="w-full p-4 px-6 items-center border-b-2 flex justify-between">
                    <p className="text-lg font-medium">{currentLevel.level} Уровень</p>
                    <p className="text-lg">{current + 1}/{currentLevel.words.length}</p>
                </div>
                <div className="w-full h-full flex justify-center flex-col gap-7 items-center">
                    <div className="w-full mb-16 p-2 flex flex-col items-center justify-center gap-7">
                        {!completed && hiddenWord ? (
                            <>
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={current}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.3 }} 
                                        className="text-2xl font-medium">{hiddenWord.english}</motion.p>
                                </AnimatePresence>
                                <input
                                    value={findWord}
                                    onChange={handleChange}
                                    type="text"
                                    className="w-2/3 rounded-md outline-none px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                                />
                            </>
                        ) : (
                           <AnimatePresence mode="wait">
                             <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }} 
                                className="flex flex-col gap-6">
                                <p className="text-2xl font-medium">уровень пройден</p>
                                {(Number(id) + 1) <= maxLevelAvailable && 
                                    <button 
                                        className="w-full p-2 bg-indigo-600 text-white rounded-md" 
                                        onClick={getNextLevel}>
                                            следующий уровень
                                    </button>}
                                <Link to={'/levels'}><button className="w-full p-2 bg-indigo-600 text-white rounded-md">все уровни</button></Link>
                                <Link to={'/'}><button className="w-full p-2 bg-indigo-600 text-white rounded-md">на главную</button></Link>
                             </motion.div>
                           </AnimatePresence>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameLevel;
