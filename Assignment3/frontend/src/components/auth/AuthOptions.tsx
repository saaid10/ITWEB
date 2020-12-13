import React, { useContext, useState } from 'react'
import {useHistory} from "react-router-dom";

import { AppContext } from '../../context/context'
import { useAppContext } from '../../context/context'

function AuthOptions() {
    const isAuthenticated = useAppContext();

    // Use history to change url
    const history = useHistory();
    
    const register = () => history.push("/register");
    const login = () => history.push("/login");
    return (
        <nav className="auth-options">
                <button onClick={register}>Register</button>            
                <button onClick={login}>Log in</button>         
        </nav>
    )
}


export default AuthOptions

