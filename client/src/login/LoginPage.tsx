import { FC, useState } from "react";
import LoginForm from "./LoginForm";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import checkIfUserIsAuthenticated from "../auth/util";


type User = {
    username: string;
    password: string;
};

const LoginPage: FC = () => {
    const [user, setUser] = useState(checkIfUserIsAuthenticated());
    const navigate = useNavigate();
    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:5000/login/', {
                username,
                password,
            });
            const { token } = response.data;
            Cookies.set("token", token, { expires: 7 });
            setUser(checkIfUserIsAuthenticated())
            navigate("/dashboard")
            navigate(0)
        } catch (error) {
            console.log("Login failed:", error);
            // Handle login failure, display error message, etc.
        }
    };

    const handleLogout = () => {
        setUser(false);
        Cookies.remove("token")
        navigate("/login")
        navigate(0)
    };
    return (
        <div>
            {user ? (
                <div>
                    <p>Welcome, {user.username}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <h1>Login</h1>
                    <LoginForm onSubmit={handleLogin} />
                </div>
            )}
        </div>
    );
};

export default LoginPage;