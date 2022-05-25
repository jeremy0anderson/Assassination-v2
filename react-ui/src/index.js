import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router } from 'react-router-dom';
import {ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client";
import { setContext } from 'apollo-link-context';


const token = localStorage.getItem('accessToken');
const httpLink = createHttpLink({
    uri: "https://assassination-react.herokuapp.com/graphql",
    credentials: "same-origin"
})

const authHeader = setContext((_, {headers})=>{
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
});

export const client = new ApolloClient({
    link: authHeader.concat(httpLink),
    uri: "https://assassination-react.herokuapp.com/graphql",
    cache:new InMemoryCache(),
    headers: JSON.stringify(token)
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
