import React from "react";
import { Routes,Route  } from "react-router-dom";
import Login from "./auth/login.tsx";
import Register from "./auth/register.tsx";
import Main from "./main/main.tsx";
import GameLevel from "./game/gameLevel.tsx";
import TimeGame from "./game/timeGame.tsx";
import Leaderboard from "./User/leaderboard.tsx";
import EndlessGame from "./game/endlessGame.tsx";

const Routers = ()=>{
    return(
        <Routes>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/" element={<Main></Main>}></Route>
            <Route path="/level/:id" element={<GameLevel></GameLevel>}></Route>
            <Route path="/timer" element={<TimeGame></TimeGame>}></Route>
            <Route path="/leaderboard" element={<Leaderboard></Leaderboard>}></Route>
            <Route path='/endless' element={<EndlessGame></EndlessGame>}></Route>
        </Routes>
    )
}

export default Routers;