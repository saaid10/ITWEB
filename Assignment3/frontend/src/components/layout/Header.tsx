import React from 'react'
import {Link, useHistory} from "react-router-dom";
import AuthOptions from '../auth/AuthOptions'

function Header() {
    const history = useHistory();
    return (
        <header id="header">
            <Link to="/">
                <h1 className="title">Dual-Ballz-Back</h1>
            </Link>
            <nav className="auth-options">
                <button onClick={() => history.push('/highscore')}>Highscores</button>
            </nav>
            <AuthOptions />
        </header>
    )
}


export default Header

