import {Routes, Route, Link} from "react-router-dom";
import React from 'react';
import {useState, useEffect} from "react";
import {io}  from 'socket.io-client';

function Socket(){
    let [socket, setSocket] = useState(null);
    useEffect(()=>{
    const ws = io(`${document.location.origin}/game`,{
        transports: ['websocket', 'polling']
    })
        ws.on('connect', ()=>{
            setSocket(socket.id);
        })


    },[])

    return(
        <div classNam="socket">
            {socket}
        </div>
    )
}


export function Lobby(){
        let [players, setPlayers] = useState({
                username: "Jeremy",
                game_code: "123456"
            });
            useEffect(()=>{
                fetch('/api/players').then(res => res.json())
                    .then(data => {
                        setPlayers(data)
                    });
        },[])
}
