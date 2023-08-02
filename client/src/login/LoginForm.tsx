import { FC, FormEvent, useState } from "react";
import { Message } from '../styles/Message';
import { Link } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";

type LoginFormProps = {
  onSubmit: (username: string, password: string) => void;
};

const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(username, password);
  };

  return (
<Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>שם משתמש</Form.Label>
        <Form.Control
          type="text"
          placeholder="שם משתמש"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>סיסמא</Form.Label>
        <Form.Control
          type="password"
          placeholder="סיסמא"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        התחבר!
      </Button>
      <Message color="#007bff">New to us? <Link to="/signup">Sign Up</Link></Message>
    </Form>
  );
};

export default LoginForm;