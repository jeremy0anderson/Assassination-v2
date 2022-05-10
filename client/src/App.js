import './App.css';
import './style.css';
import 'bulma/css/bulma.min.css';
import Homepage from './pages/partials/home';
import {useEffect, useState} from 'react';
import {Register, RegisterTop} from './pages/partials/register';
import Navbar from './pages/partials/navbar';
import {Link, Route, Routes, Redirect} from 'react-router-dom';
import SocketIO from './utils/sockets';
import {HostLobby} from './pages/lobby';
function App() {
    // let {isLoading, error, data} = useFetch("/api/players");
    // if (isLoading)
    //     return "loading...";
    // if (error){
    //     console.log('error fetching data',error);
    //     throw error;
    // }
    // if (!data.host) {
    //     data = data.map(({username, game_code}) => {
    //         return (
    //             <div key={username}>
    //                 <p>{username}</p><p>{game_code}</p>
    //             </div>
    //         );
    //     })
    // } else if (data.host) {
    //     data = data.map(({host}) => {return (
    //             <div key={host}>
    //                 <p>{host.first_name}</p><p>{host.last_name}</p><p>{host.email}</p><p>{host.username}</p><p>{host.game_code}</p>
    //             </div>
    //         )
    //     })
    // }

    function Home(){
        return(
            <div className="App">
                <Navbar/>
                <Homepage/>
            </div>
        )
    }
    return (
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/register" element={[<Navbar/>,<RegisterTop/>,<Register/>]}/>
                <Route exact path="/lobby" element={<HostLobby/>}/>
            </Routes>
  );
}

export default App;
