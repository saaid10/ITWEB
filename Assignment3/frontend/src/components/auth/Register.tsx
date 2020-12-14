import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { SetIsLoggedInOperation } from '../../state/auth/operations';
import './Login.scss';
import Button from '@material-ui/core/Button';
import { AccessToken } from '../../constants';

function Register() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userConfirmPassword, setUserConfirmPassword] = useState('');

    async function handleSubmit(event: any) {

        await fetch('/api/auth/registration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: userName, password: userPassword, confirmPassword: userConfirmPassword })
        })
            .then(response => response.json())
            .then(data => data.token)
            .then((token: string) => {
                if (token) {
                    localStorage.setItem(AccessToken, token)
                    SetIsLoggedInOperation(true)(dispatch);
                    history.push('/');
                }
            });
    }

    return (
        <div>
            <h1 className="input-box">Register</h1>
            <p className="input-box">Enter username and password:</p>
            <div className="input-box"><TextField label="User Name" type='text' value={userName} onChange={(e) => setUserName(e.target.value)} /></div>
            <div className="input-box"><TextField label="Password" type='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} /></div>
            <div className="input-box"><TextField label="Confirm Password" type='password' value={userConfirmPassword} onChange={(e) => setUserConfirmPassword(e.target.value)} /></div>
            <div className="login-button"><Button variant="contained" onClick={handleSubmit}>Submit</Button></div>
        </div>
    )
}

export default Register

