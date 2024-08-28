import React, { FC } from "react";
import {useForm} from 'react-hook-form';
import { useDispatch } from "react-redux";
import { registerUser } from "../AuthSlice";
import {Link} from 'react-router-dom';
import { toast } from "react-toastify";
export interface User{
    username: string,
    email: string,
    password: string,
}

const Register:FC = ()=>{
    const {register,handleSubmit,formState:{errors}} = useForm<User>();
    const dispatch = useDispatch();
    const submit = async (data:User)=>{
        try{
            await dispatch(registerUser(data));
            toast.success('вы успешно зарегестрировались')
        } catch (err){
            console.log(err);
        }
    }
    return(
        <div className="w-full min-h-full flex justify-center items-center">
            <div className="flex min-h-full w-full flex-col items-center justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Регистрация
                    </h2>
                </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(submit)} action="#" method="POST" className="space-y-4">
                <div className="flex flex-col items-start">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Имя Пользователя
                    </label>
                    <div className="mt-2 w-full">
                        <input
                        {...register('username',{
                            required: 'это поле обязательно',
                            minLength: {
                                value: 4,
                                message: 'имя должно содержать минимум 4 символа'
                            }
                        })}
                        id="username"
                        name="username"
                        type="text"
                        required
                        autoComplete="username"
                        className="block w-full rounded-md outline-none px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>
                </div>
                <div className="flex flex-col items-start">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Адрес Email
                    </label>
                    <div className="mt-2 w-full">
                        <input
                            {...register('email',{
                                required: 'это поле обязательно',
                                pattern: {
                                    value: /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'не валидный email'
                                }
                            })}
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="block w-full rounded-md outline-none px-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                </div>
                <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Пароль
                    </label>
                    <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Забыли Пароль?
                    </a>
                    </div>
                </div>
                <div className="mt-2">
                    <input
                    {...register('password',{
                        required: 'это поле обязательно',
                        minLength: {
                            value: 8,
                            message: 'минимальное количество символов в пароле 8'
                        },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: "Пароль должен содержать минимум 8 символов, включая хотя бы одну заглавную букву, одну строчную букву, одну цифру и один специальный символ."
                        }
                    })}
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full outline-none px-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Регистрация
                    </button>
                </div>
            </form>
                <p className="mt-8 text-center text-sm text-gray-500 ">
                    есть аккаунт? 
                    <Link to='/login'>
                        <span className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Авторизуйтесь
                        </span>
                    </Link>
                </p>
                </div>
            </div>
        </div>
    )
}

export default Register;