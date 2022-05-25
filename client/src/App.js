import './style.css';
import 'bulma/css/bulma.min.css';
import React from 'react';
import {Route, Routes, Redirect, Navigate} from 'react-router-dom';
import {Homepage, Nav, Login, Register, Join, Timer, Lobby} from './components';
import {io} from "socket.io-client";
import {Homepage, Nav, Login, Register, SocketHandler, Join, Timer, Lobby} from './components';

const token = JSON.parse(localStorage.getItem('accessToken'));
const socketToken = {token: token};

export const socket = io('http://localhost:4000', {
    extraHeaders: {
        Authorization: token ? `Bearer ${token}` : ''
    }
});
export const SocketContext = React.createContext(socket)

function App() {
    return (
        <SocketContext.Provider value={socket}>
        <div className="App" key="App">
            <Nav/>
            <Routes>
                <Route key="home" path="/" element={<Homepage/>}/>
                <Route key="register" path="/register" element={<Register/>}/>
                <Route key="lobby" path="/lobby" element={!token ? <Navigate to="/login"/> : <Lobby/>}/>
                <Route key="login" path="/login" element={token ? <Navigate to="/lobby"/> : <Login/>}/>
                <Route key="join" path="/lobby/join" element={<Join/>}/>
            </Routes>
        </div>
        </SocketContext.Provider>
  );
}
export default App;
