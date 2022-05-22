import crown from './lib/images/crown.png';
import {useState, useEffect} from 'react';
import {Form} from 'react-bulma-components'
import {gql, useMutation, useQuery} from '@apollo/client'
import {Navigate} from 'react-router-dom';
const API_URL = "/api/authorize";
export function Login(){
    const loginMutation = gql`mutation($username: String!, $password: String!){
        login(username: $username, password: $password){
            accessToken
        }
    }`;
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [login] = useMutation(loginMutation);

    // useEffect(()=>{
    //
    //
    // }, [setUsername, setPassword])
    const handleSubmit = async(e)=>{
        e.preventDefault();
        await login({
            variables: {
                username: username,
                password: password
            },
            onCompleted: ({login}) => {
                localStorage.setItem("accessToken", JSON.stringify(login.accessToken));
                document.location.replace('/lobby');
            },
            onError: ({error})=>{
                setErr(error);
            }
        });
    }

    return(
        <form onSubmit={handleSubmit} className="join-form">
            <Form.Field className="field"><Form.Input
                name="username"
                type="text"
                placeholder="Username"
                className="input is-large control form-input"
                onChange={(e)=>{
                    setUsername(e.target.value)
                }}
            />
            </Form.Field>
            <Form.Field className="field">
                <label style={{color: "red"}} key={err}> <Form.Input
                name="password"
                type="password"
                placeholder="Password"
                className="is-large control form-input"
                onChange={(e)=>{
                    setPassword(e.target.value);
                }}
            />{err}</label>
            </Form.Field>

            <Form.Field className="field join-submit"><Form.Input
                className="button is-block is-info is-large is-fullwidth fa fa-sign-in form-input"
                type="submit"
                value="Sign In"
            />
            </Form.Field>

        </form>
    )
}




// export class Login extends Component {
//     constructor(props) {
//         super(props);
//
//         this.loginMutation = gql`
//             mutation($username: String!, $password: String!){
//                 login(username: $username, password: $password)
//             }`;
//
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleUsernameChange = this.handleUsernameChange.bind(this);
//         this.handlePasswordChange = this.handleUsernameChange.bind(this);
//         this.props = props;
//         this.state = {
//             username: "",
//             password: ""
//         };
//
//     }
//
//     handleSubmit = (e) => {
//         e.preventDefault();
//         const [loginFunction, {loading, err, data}] = useMutation(this.loginMutation)
//             loginFunction({
//                 variables: {
//                    username: this.state.username,
//                    password: this.state.password
//                 }
//             }).then(token => localStorage.setItem('accessToken', JSON.stringify(token)));
//     }
//     handleUsernameChange = (e)=> {
//         this.setState({username:e.target.value})
//     }
//     handlePasswordChange = (e) => {
//         this.setState({password: e.target.value})
//     }
//     required = value => {
//         if (!value) {
//             return (
//                 <div className="alert alert-danger" role="alert">
//                     Required!
//                 </div>
//             );
//         }
//     };
//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <Form.Field className="field"><Form.Input
//                     name="username"
//                     type="text"
//                     placeholder="Username"
//                     className="input is-large control"
//                     validations={[this.required]}
//                     onChange={this.handleUsernameChange}
//                     value={this.username}
//                 />
//                 </Form.Field>
//                 <Form.Field className="field"><Form.Input
//                     name="password"
//                     type="password"
//                     placeholder="Password"
//                     className="input is-large control"
//                     validations={[this.required]}
//                     onChange={this.handlePasswordChange}
//                     value={this.password}
//                 />
//                 </Form.Field>
//                 <Form.Field className="field"><Form.Input
//                     className="button is-block is-info is-large is-fullwidth fa fa-sign-in"
//                     type="submit"
//                     value="Sign In"
//                 />
//                 </Form.Field>
//
//             </form>
//         )
//     }
// }
// export class Login extends Component{
//     constructor(props){
//         super(props);
//         this.onChangeUsername = this.onChangeUsername.bind(this);
//         this.onChangePassword = this.onChangePassword.bind(this);
//         this.state = {
//             username:"",
//             password:"",
//             message:"",
//             successful: false
//         }
//     }
//
//
//     onChangeUsername(e){
//         this.setState({
//             username: e.target.value
//         });
//     }
//     onChangePassword(e){
//         this.setState({
//             password: e.target.value
//         })
//     }
//     render(){

//         function update(e) {
//             e.preventDefault();

//         }
//         return (
//             // <Form onSubmit={update} ref={c => {this.form = c;}}>
//             //     <div className="field"><Input
//             //             name="username"
//             //             type="text"
//             //             placeholder="Username"
//             //             className="input is-large control"
//             //             validations={[required]}
//             //             onChange={this.onChangeUsername}
//             //             value={this.state.username}
//             //         />
//             //     </div>
//             //     <div className="field"><Input
//             //             name="password"
//             //             type="password"
//             //             placeholder="Password"
//             //             className="input is-large control"
//             //             validations={[required]}
//             //             onChange={this.onChangePassword}
//             //             value={this.state.password}
//             //         />
//             //     </div>
//             //     <div className="field"><Input
//             //             className="button is-block is-info is-large is-fullwidth fa fa-sign-in"
//             //             type="submit"
//             //             value="Sign In"
//             //         />
//             //     </div>
//             //     <div className="field"><CheckButton
//             //         style={{ display: "none" }}
//             //         ref={c => {this.checkBtn = c;}}/>
//             //     </div>
//             // </Form>
//         );
//     }
// }
