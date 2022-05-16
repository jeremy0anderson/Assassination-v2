import crown from '../lib/images/crown.png';
import {Component} from 'react';
import {registerPlayer} from './Auth';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import validate from "validator";

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
        this.setState({
            message: "",
            successful: false
        });
        this.form.validateAll();
        if (this.checkBtn.context._errors.length === 0) {
            registerPlayer(this.state.first_name, this.state.last_name, this.state.username, this.state.email, this.state.password)
                .then(response => {
                    this.setState({
                        message: response.data.message,
                        successful: true
                    });
                },error =>{
                    if(error)
                        throw error;
                })
        }
    }
    render(){
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
        return (
            <Form onSubmit={this.handleRegister} ref={c => {this.form = c;}}>
                <div className="field"><Input
                        name="first_name"
                        type="text"
                        placeholder="First Name"
                        className="input is-large control"
                        validations={[required]}
                        onChange={this.onChangeFirstName}
                        value={this.state.first_name}
                />
                </div>
                <div className="field"><Input
                        name="last_name"
                        type="text"
                        placeholder="Last Name"
                        className="input is-large control"
                        validations={[required]}
                        onChange={this.onChangeLastName}
                        value={this.state.last_name}
                />
                </div>
                <div className="field"><Input
                        name="username"
                        type="text"
                        placeholder="Username"
                        className="input is-large control"
                        validations={[required]}
                        onChange={this.onChangeUsername}
                        value={this.state.username}
                />
                </div>
                <div className="field"><Input
                        name="email"
                        type="text"
                        placeholder="Email"
                        className="input is-large control"
                        validations={[required, email]}
                        onChange={this.onChangeEmail}
                        value={this.state.email}
                />
                </div>
                <div className="field"><Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="input is-large control"
                        validations={[required]}
                        onChange={this.onChangePassword}
                        value={this.state.password}
                />
                </div>
                <div className="field"><Input
                    className="button is-block is-info is-large is-fullwidth fa fa-sign-in"
                    type="submit"
                    value="Sign Up"
                />

                </div>
                <div className="field"><CheckButton
                        style={{ display: "none" }}
                        ref={c => {this.checkBtn = c;}}/>
                </div>
            </Form>
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
