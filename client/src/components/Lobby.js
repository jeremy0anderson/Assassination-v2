import {Form} from 'react-bulma-components';
import {useEffect, useState, useContext} from "react";
import {SocketContext} from "../App";

const {Field, Checkbox} = Form;
const token = JSON.parse(localStorage.getItem('accessToken'));


const socketToken = {token: token}


function Sockets(){
    const [active, setActive] = useState([]);


    return (
        <SocketContext.Consumer>
            {(socket)=>{
                socket.connect();
                socket.on('connect', () => {
                    socket.emit('authenticate', socketToken);
                    console.log(socket.id);
                });
                socket.on('authorized', (activePlayers) => {
                    setActive(activePlayers.map(({username}) => {
                        return (<Field key={username}>
                            <Checkbox>{username}</Checkbox>
                        </Field>)
                    }))
                });
                socket.on('updatedOnDisconnect', (activePlayers) => {
                    console.log(activePlayers);
                    setActive(activePlayers.map(({username}) => {
                        return (<Field key={username}>
                            <Checkbox>{username}</Checkbox>
                        </Field>)
                    }));
                });
                socket.on('disconnect', (reason) => {
                    console.log(reason);
                })
                return active;
            }}
        </SocketContext.Consumer>
    )
}

export function Lobby() {
    const socket = useContext(SocketContext);
  return (
      <div>
          <Sockets/>
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
