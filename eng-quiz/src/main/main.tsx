import React, { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../store";
import Menu from "./menu";
import { useGetLevels } from "../hooks/useGetLevels";
import { RootState } from "../store";
import LoaderComponent from "../component/loading";
import ProfileModal from "../component/profileModal";
import { useRelog } from "../hooks/useRelog";

const Main: FC = () => {
    const { loading } = useGetLevels();
    const {fetchData} = useRelog();
    const navigate = useNavigate();
    const profileModal:boolean = useTypedSelector((state:RootState | any)=> state.Slice.profileModal);
    const {availableLevel}:any = useTypedSelector((state:RootState)=> state.Level);
    const {profile}:any = useTypedSelector((state:RootState)=> state.Auth);
    const currentLevel = Math.min(profile.level, availableLevel);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            fetchData();
        }
    }, [profile, navigate]);

    if (loading) {
        return <LoaderComponent />;
    }

    if (!profile || !profile.level) {
        return <p>Уровень не найден</p>;
    }

    return (
        <div className="h-full">
            <Menu />
            {profileModal && <ProfileModal></ProfileModal>}
            <div className="h-2/3 flex flex-col justify-center items-center gap-12">
                <h1 className="text-4xl font-semibold">Выберите режим игры</h1>
                <div className="flex gap-8 w-full justify-center">
                    <div className="w-1/5 p-6 bg-white shadow-lg rounded-lg border-2 flex flex-col gap-4 items-center text-center">
                        <h1 className="text-3xl font-medium">Уровни</h1>
                        <p>Проходите уровни, переводя слова</p>
                        <Link to={`/level/${currentLevel}`}>
                            <button className="p-2 px-4 text-xl font-medium bg-indigo-600 text-white rounded-lg">
                                {currentLevel} уровень
                            </button>
                        </Link>
                    </div>
                    <div className="w-1/5 p-6 bg-white shadow-lg rounded-lg border-2 flex flex-col gap-4 items-center text-center">
                        <h1 className="text-3xl font-medium">На время</h1>
                        <p>Переведите как можно больше слов за минуту</p>
                        <Link to={`timer`}>
                            <button className="p-2 px-4 text-xl font-medium bg-indigo-600 text-white rounded-lg">
                                Рекорд {profile.score}
                            </button>
                        </Link>
                    </div>
                    <div className="w-1/5 p-6 bg-white shadow-lg rounded-lg border-2 flex flex-col gap-4 items-center text-center">
                        <h1 className="text-3xl font-medium">На скорость</h1>
                        <p>переведите быстрее указанного времени</p>
                        <Link to={`endless`}>
                            <button className="p-2 px-4 text-xl font-medium bg-indigo-600 text-white rounded-lg">
                                Рекорд {profile.endless}
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
