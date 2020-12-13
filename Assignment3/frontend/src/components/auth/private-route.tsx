import { RouteProps, Route } from "react-router-dom";

import {useHistory} from "react-router-dom";

function PrivateRoute(props: RouteProps){
    const isLoggedIn =  useSelector((state: AppState) => state.authReducer.isLoggedIn)  

    const history = useHistory();

    if (!isLoggedIn)
        history.push('/login')
    
    return (
        <div>
            {
                props.exact ?
                    <Route exact={true} path={props.path} component={props.component} /> 
                    :
                    <Route exact={false} path={props.path} component={props.component} />
            }
        </div>
    )
}

export default PrivateRoute;