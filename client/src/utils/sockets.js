import {io} from 'socket.io-client';
import {useState, useEffect} from 'react';
export default function SocketIO(){
    const socket = io('http://localhost:3001/game',{
        transports: ['websocket', 'polling']
    });
    let [players, setPlayers] = useState([]);
    useEffect(()=>{
        async function getPlayers(){
            await fetch('/api/players')
                .then(res => res.json())
                .then(data =>{
                    setPlayers(data);
                })
        }
        getPlayers().catch(err=>console.log('error', err))
    },[]);

    return(
        <div>
            {players.map(({username, game_code})=>{
                return (
                    <div key={username}>
                    <label className="player-label">{username}<br/><input type="checkbox"/> </label>
                </div>);
            })}
        </div>
    )
}