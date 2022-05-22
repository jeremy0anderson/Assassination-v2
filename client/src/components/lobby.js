// import React from 'react';
// import {useState, useEffect} from 'react';
// // import socketIOClient from 'socket.io-client';
// // export function SocketIO(props){
// //
// //     const [socketRes, setSocketRes] = useState('');
// //
// //     useEffect(()=>{
// //         setSocketRes('');
// //     })
// //     const socket = socketIOClient(`http://127.0.0.1:${props.PORT}`)
// //     socket.on('connect', ()=>{
// //         console.log(socket.id);
// //         setSocketRes(socket.id);
// //         return(
// //             <h3 key={socketRes}>{socketRes}</h3>
// //         );
// //     })
// // }
// // async function GetPlayers(){
// //
// // }
// // export function Lobby(){
// //     const [players, setPlayers] = useState(null);
// //     useEffect(()=> {
// //         async function get() {
// //             let res = await fetch('/api/players');
// //             let data = await res.json();
// //             setPlayers(data);
// //             return setPlayers(data.map(obj => {
// //                 <div key={obj.username} className="active-players">
// //                     <h3>{obj.username}</h3>
// //                     <p key={obj.game_code}>{obj.game_code}</p>
// //                 </div>
// //             }));
// //         }
// //         get();
// //     });
// //     return(
// //         <div>
// //             <SocketIO PORT="3003"/>
// //         </div>
// //     )
// //
// //
// //
// // }
// // export default {Lobby, SocketIO};
// export class Lobby extends React.Component{
//     constructor(props){
//         super(props)
//         this.props.username = props.username;
//         this.props.game_code = props.game_code;
//         this.state = {
//             players: []
//         };
//     }
//     componentDidMount(props){
//
//     }
//     async getPlayers(){
//         fetch('/api/players')
//             .then(res =>{
//                     this.setState(res.json())
//                 }
//             )
//         this.props = {
//             username: this.state.username,
//             game_code: this.state.game_code
//         }
//         this.state.map(obj =>{
//             this.setState(
//                 <div>
//                     <div key={obj.username}>{obj.username}</div>
//                     <div key={obj.game_code}>{obj.game_code}</div>
//                 </div>
//             );
//             return this.state;
//         });
//     }
//     render(props){
//         return(
//             <div>
//
//             </div>
//         )
//
//     }
//     componentDidUpdate(props){
//
//     }
// }
import {useEffect, useState, useContext} from "react";
import {Button, Form,Card, Section} from 'react-bulma-components';
import {gql, useQuery, useMutation} from '@apollo/client';
import {SocketContext} from "../index";

const getActivePlayers = gql`
    query{
        getActivePlayers {
            username,
            game_code
        }
    }`;
const activePlayerMutation  = gql`
mutation($auth: String){
    getAuthorizedPlayer(auth: $auth){
        username, game_code
    }
}`;
let active = [];
export async function AuthorizedPlayer() {
}
export function ActivePlayers() {
    const {loading, error, data} = useQuery(getActivePlayers);
    if (loading) return <div>Loading...</div>
    if (error) return `Error! | ${error.message}`;

    return (data.map(({username, game_code}) => {
        return (
            <div key={username}>
                {username}: {game_code}
            </div>
        );
    }));

}
export function Lobby() {
    const socket = useContext(SocketContext)
    socket.connect();
    const [players, setPlayers] = useState("players go here");
    const [message, setMessage] = useState("Message goes here");
    const [getAuthorizedPlayer] = useMutation(activePlayerMutation);
    // getAuthorizedPlayer({
    //     variables: {
    //         auth: `Bearer ${localStorage.getItem('accessToken')}`
    //     },
    //     onCompleted: ({getAuthorizedPlayer}) => {
    //         setPlayers(
    //             getAuthorizedPlayer.username
    //         )
    //     },
    //
    // });
    useEffect(() => {
        socket.on('connect', () => {
            console.log(socket.id);
            setMessage(socket.id)
            socket.emit('hello', socket.id);
        });
        socket.on('connected', (data) => {

        })
        socket.on('hello-back', (reply) => {
            let mapped = reply.map(({username, game_code})=>{
                return(
                    <div>
                    <p key={username}>{username}</p>
                    <br/>
                    <p key={game_code}>{game_code}</p>
                    </div>
                )
            })
            setMessage(mapped);
        });
        socket.on('disconnect', (reason) => {
            console.log(reason);
        })
    }, []);

    return (<div>
            <div key={message}>
                {message}
            </div>
            <div key={players}>
                {players}
            </div>
        </div>
    )


}















// <section className="column is-12-mobile is-12-tablet is-6-desktop text-yellow px-5 p-6" id="host-player-list">
//     <h3 className="is-hidden-mobile">Select which players you would like to play as the opposing Kings.</h3>
//     <p className="is-hidden-tablet">Select which players you would like to play as the opposing Kings.</p>
//     <div className="box" id="player-list">
//         <Form id="players-list-display">
//                 {players}
//                     <div class="buttons">
//                     <Button class="button background-red text-white is-centered px-6" id="start-game">Start Game</Button>
//                     <Button class="button background-blue text-white is-right px-6" id="cancel-game">Cancel Game</Button>
//                     </div>
//                     <!-- game/rules/roles panel -->
//                     <section class="column is-6-desktop is-hidden-touch p-6" >
//                     <section class="game-code">Game Code: {{gameCode}}</section>
//                     <div class="box" id="game-info-pannel">
//                     <nav class="level px-5" id="game-info-menu">
//                     <p class="level-item has-text-centered">
//                     <a class="link is-info">How to Play</a>
//                     </p>
//                     <p class="level-item has-text-centered">
//                     <a class="link is-info">Story</a>
//                     </p>
//                     <p class="level-item has-text-centered">
//                     <a class="link is-info">Roles</a>
//                     </p>
//                     <p class="level-item has-text-centered">
//                     <a class="link is-info">Starting Questions</a>
//                     </p>
//                     </nav>
//                     <div id="game-instructions">
//                     <h3 class="text-red">
//                     THE GAME
//                     </h3>
//                     <ol>
//                     <li>
//                     Each player will receive a role card (King, Guard, Assassin, and more!) with information about their character
//                     </li>
//                     <li>
//                     Then each player will be sent into either the Red King’s Court or the Blue King’s Court
//                     </li>
//                     <li>
//                     At court, each player must interact with other players to further their objectives
//                     </li>
//                     <li>
//                     At the end of the round, each King will banish a number of subjects from their court and send them to the other King’s court
//                     </li>
//                     <li>
//                     After 3 rounds, all characters will reveal their identities
//                     </li>
//                     <li>
//                     If the other King’s Assassin is in the same room as the opposite king (Red Assassin with the Blue King) that King is dead UNLESS their guard is also in the same room (Blue Guard to protect the Blue King)
//                     </li>
//                     </ol>
//                     </div>
//                     </div>
//                     </section>
//                     <section class="column is-12-mobile is-8-tablet is-hidden text-white" id="right-column"></section>
