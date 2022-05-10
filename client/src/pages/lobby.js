import {useState, useEffect} from 'react';
import {io} from 'socket.io-client';
export function HostLobby(){

    let [players, setPlayers] = useState([]);
    useEffect(()=>{
        async function getPlayers(){
            await fetch('/api/players')
                .then(res => res.json())
                .then(data =>{
                    data.map(({username, game_code})=>{
                        return (
                            <div key={username} className="player" id={username}>
                                <label className="player-label">{username}<br/><input type="checkbox"/> </label>
                                <hr/>
                                <p className="game-code">{game_code}</p>
                            </div>
                        )
                    })
                    setPlayers(data.map);
                })
        }
        getPlayers().catch(err=>console.log('error', err))
    },[]);

    return(
        <div>
            {players}
        </div>
    )
}