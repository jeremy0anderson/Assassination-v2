import './App.css';
import './style.css';
import 'bulma/css/bulma.min.css';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {Lobby} from './components/lobby';

import {Homepage, Nav, Login, Register, SocketHandler} from './components';

function App() {
    function Home(){
        return([<Homepage key={Homepage}/>,<SocketHandler key={SocketHandler}/>]);
    }
    function Signin(){
        return[<Nav/>, <Login/>]
    }
    function Signup(){
        return([<Nav/>, <Register/>])
    }
    return (
        <div className="App" key="App">
            <Nav/>
            <Routes>
                <Route key="home" path="/" element={<Home/>}/>
                <Route key="register" path="/register" element={<Signup/>}/>
                <Route key="lobby" path="/lobby" element={<Lobby/>}/>
                <Route key="login" path="/login" element={<Signin/>}/>
            </Routes>
        </div>
  );
}

export default App;
