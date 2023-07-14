import { Outlet, Navigate } from 'react-router-dom';
import { UserData } from './util';

type AuthRouteProps = {
    user: UserData;
};

const AuthRoute: React.FC<AuthRouteProps> = ({ user }) => {
    let authenticationPath = "/login"
    if (!user.isAuthenticated) {
        return <Navigate to={authenticationPath} replace />;
    }

    return <Outlet />;
};

export default AuthRoute;