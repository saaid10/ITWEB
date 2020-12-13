import React, { useState } from 'react'
import { useAppContext } from '../../context/context'

function Login() {

    const { userHasAuthenticated } = useAppContext();

    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');

    function handleSubmit(event: any) {
        console.log(userName, userPassword);
        
        // Something async
        fetch('/api/auth/login', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({username: userName, password: userPassword})}).then((response)=>console.log(response.json));

        userHasAuthenticated(true);
    }

    return (
        <div>
            <h1>Log In</h1>
            <p>Enter username and password:</p>
            <input minLength={6} type='text' value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input minLength={6} type='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
            <button onClick={handleSubmit}>Button</button>
        </div>
    )
}

export default Login





