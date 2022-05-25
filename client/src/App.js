import './style.css';
import 'bulma/css/bulma.min.css';
import React from 'react';
import {Route, Routes, Redirect, Navigate} from 'react-router-dom';
import {Homepage, Nav, Login, Register, Join, Timer, Lobby} from './components';
import {socket, SocketContext} from "./components/context/socket";

const token = localStorage.getItem('accessToken');
console.log(token);
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
