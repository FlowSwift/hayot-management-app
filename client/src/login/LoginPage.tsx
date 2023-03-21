import { FC, useState } from "react";
import LoginForm from "./LoginForm";

type User = {
  username: string;
  password: string;
};

const LoginPage: FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (username: string, password: string) => {
    // Check if username and password are correct
    const isValidUser = true; // Replace with your authentication logic
    if (isValidUser) {
      setUser({ username, password });
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.username}!</p>
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