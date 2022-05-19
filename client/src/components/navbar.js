import navLogo from '../lib/images/assassination_navbar.png';
import {
    Navbar
} from 'react-bulma-components';
import {io} from 'socket.io-client';
import {useEffect, useState} from "react";
export default function Nav(){
    const [socket, setSocket] = useState(io('/', {transports:['websocket']}));
    useEffect(()=>{
        setSocket(io("http://localhost:3001/game", {
            transports: ['websocket'],
            autoConnect: true
        }));
        socket.connect();
        socket.on('connected', ()=>{
            console.log(socket.id);
            socket.emit('react', (c)=>{
                return c = "connected"
            });
        })

    }, [])
    return(
        <Navbar className="navbar background-black has-text-centered" id="navigation">
        <Navbar.Brand>
            <a href="/"> <img src={navLogo}/></a>
        </Navbar.Brand>
            <div className="socket">{socket.id}</div>
        </Navbar>

    )
}




        // <div className="columns">
        //     <div className="column">
        //         <nav className="navbar background-black has-text-centered" id="navigation">
        //             <a href="/">
        //                 <img src={navLogo}
        //                      alt="Assassination: Between Two Kingdoms"
        //                      id="navigation-img"
        //                 />
        //             </a>
        //
        //             <div className="navbar-buttons">
        //                 <a href="/register">
        //                     <button className="button is-fullwidth mb-3 background-red" id="register">
        //                         Sign Up
        //                     </button>
        //                 </a>
        //                 <a href="/">
        //                     <button className="button is-fullwidth background-blue" id="login">
        //                         Sign In
        //                     </button>
        //                 </a>
        //             </div>
        //             <h5 className="text-white mt-6">Welcome</h5>
        //         </nav>
        //     </div>
        // </div>
