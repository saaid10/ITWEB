import React, {useState} from 'react'
import {TextField} from '@material-ui/core'
import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';
import { SetIsLoggedInOperation } from '../../state/auth/operations';

function Register() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');

    async function handleSubmit(event: any) {
        console.log(userName, userPassword);
        
        // Something async
        const response = await fetch('/api/auth/registration', {
            method: 'POST', 
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({username: userName, password: userPassword, confirmPassword: userConfirmPassword})});


        if (response.status == 200)
        {
            console.log('Registration auth - 200 ok');
            SetIsLoggedInOperation(true)(dispatch);
            history.push('/')
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <p>Enter username and password:</p>
            <TextField label="User Name" type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
            <TextField label="Password" type='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
            <TextField  label="Confirm Password" type='password' value={userConfirmPassword} onChange={(e) => setUserConfirmPassword(e.target.value)} />
            <button onClick={handleSubmit}>Button</button>
        </div>
    )
}

export default Register

