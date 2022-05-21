import './App.css';
import './style.css';
import 'bulma/css/bulma.min.css';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Lobby} from './components/lobby';

import {Homepage, Nav, Login, Register, SocketHandler} from './components';

function App() {
    return (
        <div className="App" key="App">
            <Nav/>
            <Routes>
                <Route key="home" path="/" element={<Homepage/>}/>
                <Route key="register" path="/register" element={<Register/>}/>
                <Route key="lobby" path="/lobby" element={<Lobby/>}/>
                <Route key="login" path="/login" element={<Login/>}/>
            </Routes>
        </div>
  );
}

export default App;
