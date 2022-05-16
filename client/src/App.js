import './App.css';
import './style.css';
import 'bulma/css/bulma.min.css';
import React,{useEffect, useState} from 'react';
import {Link, Route, Routes, Redirect} from 'react-router-dom';
import {Lobby} from './components/lobby';
import {io} from 'socket.io-client';

import {Homepage, Nav, Login, Register} from './components';

function SocketIO(props){
    let socket = io(props.url, props.config)

}
function App() {
    function Home(){
        return [<Nav/>, <Homepage/>]
    }
    function Signin(){
        return[<Nav/>, <Login/>]
    }
    function Signup(){
        return
    }
    return (
        <div className="App" key="App">
            <Nav/>
            <Routes >
                <Route path="/" element={<Homepage/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/lobby" element={<Lobby/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
  );
}

export default App;
