import {gql, useMutation} from "@apollo/client";
import {useState, useContext} from 'react';
import {Form, Button} from 'react-bulma-components';
import {SocketContext} from '../App';
export function Join(){

    const joinMutation = gql`
    mutation ($username: String!, $game_code: String!, $socket_id: String!,){
        registerPlayer(username: $username, game_code: $game_code, socket_id: $socket_id){
            username
            game_code
            socket_id
        }
    }`;
    const socket = useContext(SocketContext);
    const [username, setUsername] = useState("");
    const [game_code, setGame_code] = useState("");
    const [join] = useMutation(joinMutation);

    return(
        <form className="join-form" onSubmit={async(e)=>{
            e.preventDefault();
            await socket.connect();
            socket.on('connect', ()=>{
                console.log(socket.id);
            })
            // await join({
            //     variables: {
            //     token: localStorage.getItem('accessToken'),
            //     socket_id: socket.id
            // },
            //     onCompleted: ({join}) =>{
            //         setUsername(join.username);
            //         setGame_code(join.game_code);
            //     },
            // });
        }}>
            <Form.Field>
                <Form.Input id="join-input-username"
                    className="background-white"
                    name="username"
                    placeholder="Username"
                    onChange={(e)=> {setUsername(e.target.value)}}
                />
            </Form.Field>
            <Form.Field>
                <Form.Input
                    id="join-input-gamecode"
                    className="background-white"
                    name="game_code"
                    placeholder="Game Code"
                    onChange={(e)=>{setUsername(e.target.value)}}
                />
            </Form.Field>
            <Form.Field>
                <Form.Input id="submit-join"
                className="button background-blue"
                type="submit"
                value="Join"
            />
            </Form.Field>
        </form>
    )
}
