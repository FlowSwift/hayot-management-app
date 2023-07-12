import { Outlet, Navigate } from 'react-router-dom';

type AuthRouteProps = {
    isAuthenticated: boolean;
};

const AuthRoute: React.FC<AuthRouteProps> = ({
    isAuthenticated,
}) => {
    let authenticationPath = "/login"
    if (!isAuthenticated) {
        return <Navigate to={authenticationPath} replace />;
    }

    return <Outlet />;
};

export default AuthRoute;