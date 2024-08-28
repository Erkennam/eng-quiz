import React, { FC, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { profillesPictures } from "../utils/profillesPictures";
import { useDispatch} from "react-redux";
import { setProfileImage } from "../Slice";
import { patchImage } from "../AuthSlice";
import { RootState, useTypedSelector } from "../store";
import { User } from "../auth/register";

const ProfileImage: FC = () => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState<string>(profillesPictures[0]);
    const {profile}: {profile: User} | any = useTypedSelector((state:RootState)=> state.Auth);
    const closeModal = () => {
        dispatch(setProfileImage());
    };
    const selectImage = (url: string) => {
        setSelected(url);
    };
    const submit = async()=>{
        console.log(profile);
        try{
            await dispatch(patchImage({id: profile._id, image: selected}))
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="w-2/4 h-2/3 bg-white rounded-xl relative flex flex-col overflow-auto">
            <div className="w-full py-4 px-6 border-b-2 flex justify-between items-center">
                <button onClick={closeModal}><CloseIcon /></button>
                <p className="text-xl font-medium">Сменить фото профиля</p>
                <button><MoreVertIcon /></button>
            </div>
            <div className="py-4 px-6 w-full flex flex-col gap-6 overflow-y-auto flex-grow">
                <p className="text-xl font-medium">Картинки</p>
                <div className="w-full flex gap-8 overflow-x-auto flex-wrap">
                    {profillesPictures.map((el: string) => {
                        return (
                            <img
                                key={el}
                                onClick={() => { selectImage(el) }}
                                className={`w-20 h-20 transition duration-150 rounded-lg border-4 ${selected === el ? "border-indigo-400" : ""}`}
                                src={el}
                                alt="profile"
                            />
                        )
                    })}
                </div>
            </div>
            <div className="w-full sticky bottom-0">
                <div className="w-full border-2 p-4 px-6 rounded-mdborder-2 flex justify-end">
                    <button onClick={submit} className="p-3 bg-black text-white rounded-md text-lg font-medium">подтвердить</button>
                </div>
            </div>
        </div>
    );
}

export default ProfileImage;
