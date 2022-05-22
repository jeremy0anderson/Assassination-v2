import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router } from 'react-router-dom';
import {ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import {io} from 'socket.io-client';


const token = localStorage.getItem('accessToken');
const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "same-origin"
})
const authHeader = setContext((_, {headers})=>{
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});
const socket = io("http://localhost:4000", {
        // transports: ['websocket', 'polling'],
        autoConnect: false,
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 500,
        extraHeaders: {
            "authorization": token
        }


    });
export const SocketContext = createContext(socket);
console.log(socket.id)

export const client = new ApolloClient({
    link: authHeader.concat(httpLink),
    uri: "http://localhost:4000/graphql",
    cache:new InMemoryCache()
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Router>
                <App/>
            </Router>
        </ApolloProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
