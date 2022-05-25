import crown from './lib/images/crown.png';
import {Component} from 'react';
import {registerPlayer} from './Auth';
import {Form, Button} from "react-bulma-components";
import {client} from '../index';
import validate from "validator";
import {gql, useMutation} from "@apollo/client";
import {useState} from "react";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Required!
            </div>
        );
    }
};
const emailReq = value => {
    if (!validate.default.isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        );
    }
};

export function Register(){
    const handleRegister = (e)=>{
        e.preventDefault();
    }
    const registerHostMutation = gql`
      mutation($first_name: String!, $last_name: String!, $username: String!, $email: String!, $password: String!) {
  registerHost(first_name: $first_name, last_name: $last_name, username: $username, email: $email, password: $password) {
    accessToken
    }
  }`;
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [registerHost] = useMutation(registerHostMutation);

     return (
        <form onSubmit={(e)=>{
       e.preventDefault();
       await registerHostMutation({
            variables:{
                first_name: first_name,
                last_name: last_name,
                username: username,
                email: email,
                password: password
            },
            onCompleted: ({registerHost})=>{
              localStorage.setItem('accessToken', registerHost.accessToken)
              document.location.replace('/lobby');
            }
        }})}>
            <Form.Field className="field">
                <Form.Input
                    name="first_name"
                    type="text"
                    placeholder="First Name"
                    className="input is-large control form-input"
                    validations={[required]}
                    onChange={(e)=>{
                        setFirst_name(e.target.value)
                    }}
                />
            </Form.Field>
            <Form.Field className="field"><Form.Input
                name="last_name"
                type="text"
                placeholder="Last Name"
                className="input is-large control form-input"
                validations={[required]}
                onChange={(e)=>{
                    setLast_name(e.target.value)
                }}
            />
            </Form.Field>
            <Form.Field className="field"><Form.Input
                name="username"
                type="text"
                placeholder="Username"
                className="input is-large control form-input"
                validations={[required]}
                onChange={(e)=>{
                    setUsername(e.target.value)
                }}
            />
            </Form.Field>
            <Form.Field className="field"><Form.Input
                name="email"
                type="text"
                placeholder="Email"
                className="input is-large control form-input"
                validations={[required, emailReq]}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}
            />
            </Form.Field>
            <Form.Field className="field"><Form.Input
                name="password"
                type="password"
                placeholder="Password"
                className="input is-large control form-input"
                validations={[required]}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}
            />
            </Form.Field>
            <Form.Field className="field"><Button
                className="button is-block is-info is-large is-fullwidth fa fa-sign-in form-input"
                type="submit">
                Sign Up
            </Button>
            </Form.Field>
        </form>
    );
}