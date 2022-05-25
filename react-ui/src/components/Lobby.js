import {Form} from 'react-bulma-components';
import React, {useContext, useEffect, useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import {socket, SocketContext} from "./context/socket";

const {Field, Checkbox} = Form;

function Sockets(){



}

const disconnectedPlayer = gql`
    mutation ($socket_id: String!){
        removeActivePlayer(socket_id: $socket_id){
            username
        }
    }
`
const getAllPlayers = gql`
    query{
        getActivePlayers {
            username,
            game_code,
            socket_id
        }
    }`

export function Lobby() {
    const [active, setActive] = useState([]);
    const [checked, setChecked] = useState(false);
    const socket = useContext(SocketContext);
    const socketToken = {token: localStorage.getItem('accessToken')}
    useEffect(()=> {
        return(()=> {
            socket.on('connect', () => {
                socket.emit('authenticate', socketToken);
            });
            socket.on('verifyChecked', (socket_id)=>{
                document.getElementById(`${socket_id}`).toggleAttribute('checked')

            })
            socket.on('authorized', (allPlayers) => {

                setActive(allPlayers.map(({username, socket_id})=>{
                    console.log(socket_id)
                    return (<Field  key={socket_id}>
                            <Form.Checkbox  id={socket_id} key={username} onChange={()=>{
                                socket.emit('clicked', socket_id);
                            }}>
                                {username}
                            </Form.Checkbox>
                        </Field>)
                    }));
                return (<form>
                    {active}
                </form>)
            });

            socket.on('disconnect', async (reason) => {
                console.log(reason);
            });
            socket.on('disconnectedUpdate', (connections)=>{
                setActive(connections.map(({username, socket_id})=>{
                        console.log(socket_id)
                        return (<Field  key={socket_id}>
                            <Form.Checkbox  id={socket_id} key={username} onChange={()=>{
                                socket.emit('clicked', socket_id);
                            }}>
                                {username}
                            </Form.Checkbox>
                        </Field>)
                    }
                ));
                return (<form>
                    {active}
                </form>)
            });
        });
    },[setActive]);
    return (
        <div>
        <h1 style={{fontSize: "25pt"}}>Please Select Two Kings</h1>
        <div className="card" style={{padding: "20px", display: "flex", justifyContent: "space-evenly", background: "lightslategray", zIndex: "20000"}}>
            <form style={{background: "lightslategray"}}>
                {active}
            </form>
        </div>
        </div>
    )
}
