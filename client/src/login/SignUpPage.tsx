import { FC, useState } from "react";
import SignUpForm from "./SignUpForm";

type User = {
  username: string;
  password: string;
};

const SignUpPage: FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleSignUp = (username: string, password: string) => {
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
          <p>ברוך הבא, {user.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>הירשם</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
          <SignUpForm onSubmit={handleSignUp} />
        </div>
      )}
    </div>
  );
};

export default SignUpPage;