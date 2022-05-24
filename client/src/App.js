import './App.css';
import './style.css';
import 'bulma/css/bulma.min.css';
import React from 'react';
import {Route, Routes, Redirect, Navigate} from 'react-router-dom';
import {Homepage, Nav, Login, Register, Join, Timer, Lobby} from './components';
import {useContext} from 'react';
import {SocketContext, socket} from "./components/context/socket";
function App() {
    const token = localStorage.getItem("accessToken");
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
