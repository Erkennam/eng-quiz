import { useEffect } from 'react';
import './App.css';
import Register from './auth/register.tsx';
import Routers from './routes.js';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { fetchProfile } from './AuthSlice.ts';
import { useRelog } from './hooks/useRelog.ts';
import Dark from './component/dark.tsx';

function App() {
  const {dark} = useSelector((state)=> state.Slice);
  return (
    <div className="App">
      {dark && <Dark></Dark>}
      <Routers></Routers>
      <ToastContainer position='top-center'></ToastContainer>
    </div>
  );
}

export default App;
