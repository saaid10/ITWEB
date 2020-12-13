import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { SetIsLoggedInOperation } from '../../state/auth/operations';
import { AppState } from '../../state/store';

function AuthOptions() {

    const dispatch = useDispatch()

    const isAuthenticated = useSelector((state: AppState) => state.authReducer.isLoggedIn)

    const logout = () => {
        SetIsLoggedInOperation(false)(dispatch);
    }

    // Use history to change url
    const history = useHistory();
    const register = () => history.push("/register");
    const login = () => history.push("/login");

    return (
        <nav className="auth-options">
            {isAuthenticated ? (
                <button onClick={logout}>Log Out</button>
            ) : (
                    <>
                        <button onClick={register}>Register</button>
                        <button onClick={login}>Log in</button>
                    </>
                )}

        </nav>
    )
}

export default AuthOptions

