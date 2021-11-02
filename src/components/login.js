import { useState, useEffect } from "react";
import React from "react";
import axios from "../services/backendApi.js";
import Datetime from 'react-datetime';
import '../App.css';
import { Link } from 'react-router-dom';

const Login = (props) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleUpdate = (e) => {
        console.log(username);
        console.log(password);
        e.preventDefault();
        try {
            //const res = await axios.post(`/login/`, {username: username, password: password});
      
          } catch (error) {
            console.log(error);
      
          }
    }

    return (

        <div>
            <div>image</div>
            <div>
                <div>
                    <form className='form' onSubmit={handleUpdate}>
                        <label htmlFor="Username">Username: </label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Enter Username"
                            name="username"
                            onChange={onChangeUsername}
                            autoComplete="on"

                            required /><br />
                        <label htmlFor="Password">Password: </label>
                        <input  
                            type="text"
                            className="input"
                            placeholder="Enter Password"
                            name="password"
                            onChange={onChangePassword}
                            autoComplete="on"

                            required /><br />

                        <input
                            type="Enter"
                            className="btn"
                            name="Login"
                            value="Login"
                            autoComplete="on" />
                    </form>
                </div>
            </div>
        </div>
    );
}


export default Login;