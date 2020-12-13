import React, { useState } from 'react'
import {TextField} from '@material-ui/core'

import { useDispatch } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';
import { SetIsLoggedInOperation } from '../../state/auth/operations';

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
            <h1>Log In</h1>
            <p>Enter username and password:</p>
            <TextField label="User Name" type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
            <TextField label="Password" type='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
            <button onClick={handleSubmit}>Button</button>
        </div>
    )
}

export default Login





