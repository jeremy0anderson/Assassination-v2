import React from 'react';
import {useState, useEffect} from 'react';
// import socketIOClient from 'socket.io-client';
// export function SocketIO(props){
//
//     const [socketRes, setSocketRes] = useState('');
//
//     useEffect(()=>{
//         setSocketRes('');
//     })
//     const socket = socketIOClient(`http://127.0.0.1:${props.PORT}`)
//     socket.on('connect', ()=>{
//         console.log(socket.id);
//         setSocketRes(socket.id);
//         return(
//             <h3 key={socketRes}>{socketRes}</h3>
//         );
//     })
// }
// async function GetPlayers(){
//
// }
// export function Lobby(){
//     const [players, setPlayers] = useState(null);
//     useEffect(()=> {
//         async function get() {
//             let res = await fetch('/api/players');
//             let data = await res.json();
//             setPlayers(data);
//             return setPlayers(data.map(obj => {
//                 <div key={obj.username} className="active-players">
//                     <h3>{obj.username}</h3>
//                     <p key={obj.game_code}>{obj.game_code}</p>
//                 </div>
//             }));
//         }
//         get();
//     });
//     return(
//         <div>
//             <SocketIO PORT="3003"/>
//         </div>
//     )
//
//
//
// }
// export default {Lobby, SocketIO};
export class Lobby extends React.Component{
    constructor(props){
        super(props)
        this.props.username = props.username;
        this.props.game_code = props.game_code;
        this.state = {
            players: []
        };
    }
    componentDidMount(props){

    }
    async getPlayers(){
        fetch('/api/players')
            .then(res =>{
                    this.setState(res.json())
                }
            )
        this.props = {
            username: this.state.username,
            game_code: this.state.game_code
        }
        this.state.map(obj =>{
            this.setState(
                <div>
                    <div key={obj.username}>{obj.username}</div>
                    <div key={obj.game_code}>{obj.game_code}</div>
                </div>
            );
            return this.state;
        });
    }
    render(props){
        return(
            <div>

            </div>
        )

    }
    componentDidUpdate(props){

    }
}
