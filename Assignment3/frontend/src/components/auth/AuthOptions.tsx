import {useHistory} from "react-router-dom";

function AuthOptions() {

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

