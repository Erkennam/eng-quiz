import { useEffect, useCallback, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { getLevels,getCurrentLevel } from "../levelsSlice";
import { RootState } from "../store";
import { profile } from "../AuthSlice";
import { level, word } from "../levelTypes";

export const useGetLevels = () => {
    const dispatch = useDispatch();
    const user: profile = useSelector((state: RootState | any) => state.Auth.profile);
    const [loading, setLoading] = useState<boolean>(false);
    const [levelLoading,setLevelLoading] = useState<boolean>(false);
    const { levels,currentLevel, availableLevel } = useSelector((state: RootState | any) => state.Level);
    const fetchLevel = async () => {
        setLoading(true);
        try {
            await dispatch(getLevels());
            const levelToFetch = Math.min(user.level, availableLevel);
            await dispatch(getCurrentLevel(levelToFetch));
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };
    const shuffleLevels:any = useCallback(() => {
        let arr = levels.reduce((acc: word[], el: level) => {
            return [...acc, ...el.words];
        }, []).sort(() => Math.random() - 0.5);
        const duplicates = arr.reduce((acc:any,el:word)=> {
            if(!acc[el.english]){
                acc[el.english] = el;
            }
            return acc;
        },{});
        return Object.values(duplicates);
    }, [levels]);
    const fetchCurrentLevel = async (level: number) => {
        setLevelLoading(true);
        try {
            await dispatch(getCurrentLevel(level));
        } catch (err) {
            console.log(err);
        }
        finally{
            setLevelLoading(false);
        }
    };

    useEffect(() => {
        fetchLevel();
    }, [dispatch]);

    return { fetchCurrentLevel,levelLoading,shuffleLevels,loading, currentLevel, availableLevel };
};
