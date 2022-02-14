import React, {useEffect, useCallback} from "react";
import {useLocation} from "wouter";
import {auth} from "../firebase";

const AuthWrapper: React.FC = ({children}) => {
    const [, setLocation] = useLocation();
    const goHome = useCallback(() => setLocation("/"), [setLocation]);
    useEffect(() => {
        if (!auth.currentUser) goHome();
    }, [goHome]);

    return auth.currentUser ? <div>{children}</div> : <></>;
}

export default AuthWrapper;