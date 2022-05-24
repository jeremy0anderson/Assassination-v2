import crown from './lib/images/crown.png';
import {Component} from 'react';
import {registerPlayer} from './Auth';
import {Form, Button} from "react-bulma-components";
import {client} from '../index';
// import {gql} from
import validate from "validator";
import {gql} from "@apollo/client";
const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Required!
            </div>
        );
    }
};
const email = value => {
    if (!validate.default.isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};
export class Register extends Component {
    constructor(props) {
        super(props);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.state = {
            first_name:"",
            last_name:"",
            username: "",
            email: "",
            password: "",
            successful: false,
            message: ""
        };
    }
    onChangeFirstName(e) {
        this.setState({
            first_name: e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            last_name: e.target.value
        });
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();
        client.mutate({
            mutation: gql`
        mutation{
            addPlayer(username: $username, game_code: $game_code)
        }
#        } ($first_name: String!, $last_name:String!,$username: String!, $email: String!,$password: String!){
#            registerPlayer(first_name: $first_name,last_name: $last_name, username: $username, email: $email, password: $password){
#                username, game_code
#            }
       `}).then(newPlayer => {
            console.log(JSON.stringify(newPlayer.data));
        }).catch(err=>{
            if (err) throw err;
        })
        }
    render(){
        return (
            <form onSubmit={this.handleRegister}>
                <Form.Field className="field">
                    <Form.Input
                        name="first_name"
                        type="text"
                        placeholder="First Name"
                        className="input is-large control form-input"
                        validations={[required]}
                        onChange={this.onChangeFirstName}
                        value={this.state.first_name}
                    />
                </Form.Field>
                <Form.Field className="field">
                    <Form.Input
                        name="last_name"
                        type="text"
                        placeholder="Last Name"
                        className="input is-large control form-input"
                        validations={[required]}
                        onChange={this.onChangeLastName}
                        value={this.state.last_name}
                />
                </Form.Field>
                <Form.Field className="field">
                    <Form.Input
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="input is-large control form-input"
                        validations={[required]}
                        onChange={this.onChangeUsername}
                        value={this.state.username}
                />
                </Form.Field>
                <Form.Field className="field">
                    <Form.Input
                        name="email"
                        type="text"
                        placeholder="Email"
                        className="input is-large control form-input"
                        validations={[required, email]}
                        onChange={this.onChangeEmail}
                        value={this.state.email}
                />
                </Form.Field>
                <Form.Field className="field">
                    <Form.Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="input is-large control form-input"
                        validations={[required]}
                        onChange={this.onChangePassword}
                        value={this.state.password}
                />
                </Form.Field>
                <Form.Field className="field">
                    <Button
                        className="button is-block is-info is-large is-fullwidth fa fa-sign-in form-input"
                        type="submit">
                        Sign Up
                    </Button>
                </Form.Field>
            </form>
        );
    }
}
// function RegisterTop(){
//     return(
//         <section className="container has-text-centered text-white" key={null}>
//             <div className="column is-4 is-offset-4">
//                 <h3 className="title has-text-white"/>
//                 <hr className="login-hr"/>
//                 <p className="subtitle has-text-white"/>
//                 <div className="box">
//                     <figure className="avatar">
//                         <img src={crown} id="login-crown" alt="login-crown"/>
//                     </figure>
//                 </div>
//             </div>
//         </section>
//     )
// }
// function Register(){
//
//
//     return (
//         <div>
//             <section className="container has-text-centered text-white" key={null}>
//                 <div className="column is-4 is-offset-4">
//                     <h3 className="title has-text-white"/>
//                     <hr className="login-hr"/>
//                     <p className="subtitle has-text-white"/>
//                     <div className="box">
//                         <figure className="avatar">
//                             <img src={crown} id="login-crown" alt="login-crown"/>
//                         </figure>
//                     </div>
//                 </div>
//             </section>
//         <form method="post" id="register-form" className="register-form" action="/api/players" target="_self">
//             <div className="field">
//                 <div className="control">
//                     <input className="input is-large" type="text" placeholder="First Name" name="first_name" id="first_name"/>
//                 </div>
//             </div>
//             <div className="field">
//                 <div className="control">
//                     <input className="input is-large" type="text" placeholder="Last Name" name="last_name" id="last_name"/>
//                 </div>
//             </div>
//             <div className="field">
//                 <div className="control">
//                     <input  className="input is-large" type="text" placeholder="Username" name="username" id="username"/>
//                 </div>
//             </div>
//             <div className="field">
//                 <div className="control">
//                     <input className="input is-large" type="password" placeholder="Password" name="password" id="password"/>
//                 </div>
//             </div>
//             <div className="field">
//                 <input className="checkbox" type="checkbox"/>
//                 Remember me
//             </div>
//
//             <button form="register-form" type="submit" className="button is-block is-info is-large is-fullwidth" id="auth-button">
//                 <i className="fa fa-sign-in" aria-hidden="true">
//                     Register
//                 </i>
//             </button>
//         </form>
//         </div>
//     )
// }
