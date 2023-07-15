import { FC, useState } from "react";
import LoginForm from "./LoginForm";
import axios from "axios";
import axiosClient from "../axios/axiosInstance"
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { UserData } from "../auth/util";

interface Props {
    user: UserData
}
const LoginPage: FC<Props> = ({ user }) => {
    const navigate = useNavigate();
    const handleLogin = async (username: string, password: string) => {
        try {
            const response = await axios.post(axiosClient.defaults.baseURL + '/login/', {
                username,
                password,
            });
            const { token } = response.data;
            Cookies.set("token", token, { expires: 7 });
            navigate("/dashboard/products")
            navigate(0)
        } catch (error) {
            console.log("Login failed:", error);
            // Handle login failure, display error message, etc.
        }
    };

    const handleLogout = () => {
        Cookies.remove("token")
        navigate("/login")
        navigate(0)
    };
    return (
        <div>
            {user.isAuthenticated ? (
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