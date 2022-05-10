import crown from '../../lib/images/crown.png';
import {useState} from 'react';
function RegisterTop(){
    return(
        <section className="container has-text-centered text-white" key={null}>
            <div className="column is-4 is-offset-4">
                <h3 className="title has-text-white"/>
                <hr className="login-hr"/>
                <p className="subtitle has-text-white"/>
                <div className="box">
                    <figure className="avatar">
                        <img src={crown} id="login-crown" alt="login-crown"/>
                    </figure>
                </div>
            </div>
        </section>
    )
}
function Register(){


    return (
        <form method="post" id="register-form" className="register-form" action="/api/players" target="_self">
            <div className="field">
                <div className="control">
                    <input className="input is-large" type="text" placeholder="First Name" name="first_name" id="first_name"/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input className="input is-large" type="text" placeholder="Last Name" name="last_name" id="last_name"/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input  className="input is-large" type="text" placeholder="Username" name="username" id="username"/>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input className="input is-large" type="password" placeholder="Password" name="password" id="password"/>
                </div>
            </div>
            <div className="field">
                <input className="checkbox" type="checkbox"/>
                Remember me
            </div>

            <button form="register-form" type="submit" className="button is-block is-info is-large is-fullwidth" id="auth-button">
                <i className="fa fa-sign-in" aria-hidden="true">
                    Register
                </i>
            </button>
        </form>
    )
}

export {Register, RegisterTop}
