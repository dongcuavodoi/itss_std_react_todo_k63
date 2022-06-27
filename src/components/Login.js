import { StyledFirebaseAuth } from "react-firebaseui";

import {uiConfig, authorize} from "../lib/firebase"

function Login() {
    return (
        <div className="column panel-block">
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={authorize} />
        </div>
    )
}

export default Login;