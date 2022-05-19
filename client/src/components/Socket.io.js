import {io} from 'socket.io-client';
import {useState, useEffect} from "react";
export function SocketHandler(){
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io(`http://localhost:3001/game`,{
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