import {gql, useMutation} from "@apollo/client";
import {useState, useContext} from 'react';
import {Form, Button} from 'react-bulma-components';
export function Join(){

    const joinMutation = gql`
    mutation ($username: String!, $game_code: String!){
        registerPlayer(username: $username, game_code: $game_code){
            username
            game_code
            is_host
            accessToken
        }
    }`;
    const [username, setUsername] = useState("");
    const [game_code, setGame_code] = useState("");
    const [registerPlayer] = useMutation(joinMutation);

    return(
        <form className="join-form" onSubmit={async(e)=>{
            e.preventDefault();
           await registerPlayer({
               variables: {
                   username: username,
                   game_code: game_code
               },
               onCompleted: ({registerPlayer})=>{
                   localStorage.setItem("accessToken", registerPlayer.accessToken);
                   document.location.replace('/lobby');
               }
           })
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
                    onChange={(e)=>{setGame_code(e.target.value)}}
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
