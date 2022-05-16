import crown from '../lib/images/crown.png';
import axios from 'axios';
import {Component, useState, useEffect} from 'react';
import {loginPlayer} from './Auth';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import validate from "validator";
const API_URL = "/api/authorize";
// export default function Login(){
//     let [login, setLogin] = useState(null)
//     return(
//         <div className="login-form-container">
//                 <section className="container has-text-centered text-white" key={null}>
//                     <div className="column is-4 is-offset-4">
//                         <h3 className="title has-text-white"/>
//                         <hr className="login-hr"/>
//                         <p className="subtitle has-text-white"/>
//                         <div className="box">
//                             <figure className="avatar">
//                                 <img src={crown} id="login-crown" alt="login-crown"/>
//                             </figure>
//                         </div>
//                     </div>
//                 </section>
//                 <form method="post" id="login-form" className="register-form" action="/api/authorize/login" target="_self">
//                     <div className="field">
//                         <div className="control">
//                             <input  className="input is-large" type="text" placeholder="Username" name="username" id="username"/>
//                         </div>
//                     </div>
//                     <div className="field">
//                         <div className="control">
//                             <input className="input is-large" type="password" placeholder="Password" name="password" id="password"/>
//                         </div>
//                     </div>
//                     <div className="field">
//                         <input className="checkbox" type="checkbox"/>
//                         Remember me
//                     </div>
//
//                     <button form="login-form" type="submit" className="button is-block is-info is-large is-fullwidth" id="auth-button">
//                         <i className="fa fa-sign-in" aria-hidden="true">
//                             Sign In
//                         </i>
//                     </button>
//                 </form>
//         </div>
//     )
// }
export function Login(props){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API_URL}/login`, {
            username: username,
            password: password
        })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem('username', username);
                    localStorage.setItem("accessToken", JSON.stringify(response.data.accessToken));
                    setTimeout(() => {
                        document.location.replace('/')
                    }, 2000)
                }
            });
    }
    const handleUsernameChange = (e)=> {
        setUsername(e.target.value)
        console.log(username);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        console.log(password);
    }
    const required = value => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    Required!
                </div>
            );
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div className="field"><Input
                name="username"
                type="text"
                placeholder="Username"
                className="input is-large control"
                validations={[required]}
                onChange={handleUsernameChange}
                value={username}
            />
            </div>
            <div className="field"><Input
                name="password"
                type="password"
                placeholder="Password"
                className="input is-large control"
                validations={[required]}
                onChange={handlePasswordChange}
                value={password}
            />
            </div>
            <div className="field"><Input
                className="button is-block is-info is-large is-fullwidth fa fa-sign-in"
                type="submit"
                value="Sign In"
            />
            </div>

        </Form>
    )
}
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