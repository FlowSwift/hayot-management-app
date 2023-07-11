import { ReactElement } from 'react';
import { Route, Navigate } from 'react-router-dom';

type AuthRouteProps = {
    children: ReactElement
    isAuthenticated: boolean;
};

const AuthRoute: React.FC<AuthRouteProps> = ({
    children,
    isAuthenticated,
}) => {
    let authenticationPath = "/login"
    if (!isAuthenticated) {
        return <Navigate to={authenticationPath} replace />;
    }

    return children;
};

export default AuthRoute;