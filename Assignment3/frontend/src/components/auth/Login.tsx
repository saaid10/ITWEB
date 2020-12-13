import React, { useState } from 'react'
import {TextField} from '@material-ui/core'

import { useDispatch } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { SetIsLoggedInOperation } from '../../state/auth/operations';
import './Login.scss';
import Button from '@material-ui/core/Button';

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    async function handleSubmit(event: any) {
        console.log(userName, userPassword);
        
        // Something async
        const response = await fetch('/api/auth/login', {
                        method: 'POST', 
                        headers: {'Content-Type': 'application/json'}, 
                        body: JSON.stringify({username: userName, password: userPassword})});

        console.log(response.status)

        if (response.status === 200)
        {
            console.log('user auth - 200 ok');
            SetIsLoggedInOperation(true)(dispatch);
            history.push('/')
        }
    }

    return (
        <div>
            <h1 className="input-box">Log In</h1>
            <p className="input-box">Enter username and password:</p>
            <div className="input-box"><TextField color="primary" label="User Name" type='text' value={userName} onChange={(e) => setUserName(e.target.value)} /></div>
            <div className="input-box"><TextField label="Password" type='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
            <div className="login-button"><Button variant="contained" onClick={handleSubmit}>login</Button></div></div>
        </div>
    )
}

export default Login





