import {io} from 'socket.io-client';
import {Form} from 'react-bulma-components';
import {createContext, useContext, useEffect, useState} from "react";
import {useMutation, useQuery, gql} from '@apollo/client';

const {Input, Checkbox, Field} = Form;

const token = JSON.parse(localStorage.getItem('accessToken'));


const socketToken = {token: token}

 const socket = io('http://localhost:4000', {
     extraHeaders: {
        Authorization: token ? `Bearer ${token}` : ''
     }
});

const SocketContext = createContext();
function Connections(){
    const [active, setActive] = useState([]);
    socket.on('connect', () => {
        socket.emit('authenticate', socketToken);
    });
    socket.on('authorized', (activePlayers) => {
        setActive(activePlayers.map(({username}) => {
            return (<Field key={username}>
                        <Checkbox>{username}</Checkbox>
                    </Field>)
        }))
    });
    socket.on('updatedOnDisconnect', (activePlayers) => {
        setActive(activePlayers.map(({username}) => {
            return (<Field key={username}>
                <Checkbox>{username}</Checkbox>
            </Field>)
        }));
    });

    socket.on('disconnect', (reason) => {
        console.log(reason);
    })

    return(
        <form>
            {active}
        </form>
    )
}
export {SocketContext, socket, Connections};