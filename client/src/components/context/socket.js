import {Form} from 'react-bulma-components';
import {io} from "socket.io-client";
import React from "react";

const token = localStorage.getItem('accessToken');
export const socket = io('http://localhost:4000', {
    forceNew: true,

    extraHeaders: {
        Authorization: token ? `Bearer ${token}` : ''
    }
});

export const SocketContext = React.createContext(socket);





