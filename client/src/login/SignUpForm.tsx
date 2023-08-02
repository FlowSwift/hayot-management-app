import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

type SignUpFormProps = {
  onSubmit: (name: string, email: string, password: string) => void;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle sign-up logic here
  };  

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>שם</Form.Label>
        <Form.Control
          type="text"
          placeholder="שם"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>אימייל</Form.Label>
        <Form.Control
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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
        הירשם
      </Button>
    </Form>
  );
};

export default SignUpForm;