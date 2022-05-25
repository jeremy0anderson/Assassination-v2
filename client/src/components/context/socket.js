import {io} from 'socket.io-client';
import {Form} from 'react-bulma-components';
import {createContext, useContext, useEffect, useState} from "react";
import {useMutation, useQuery, gql} from '@apollo/client';

const {Input, Checkbox, Field} = Form;



 const socket = io('http://localhost:4000', {
     autoConnect: true,
     extraHeaders: {
        Authorization: token ? `Bearer ${token}` : ''
     }
});

const SocketContext = createContext(socket);

