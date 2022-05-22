import {io} from 'socket.io-client';
import {useState, useEffect, Component} from "react";
import "@apollo/client";




export function SocketHandler(){
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io(`http://localhost:4000/`,{
            transports: ['websocket', 'polling'],
            reconnection: true
        });
        return setSocket(newSocket);
    }, [setSocket])

    return(
        <div className="Socket" key="socketspace">
            <header key="s">
                {
                    socket?(
                        <div>
                            {socket.id}
                        </div>
                    ) : (
                        <div> Not Connected </div>
                    )
                }
            </header>
        </div>
    )
}