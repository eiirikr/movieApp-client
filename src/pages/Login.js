import { useState, useEffect, useContext } from "react";
import { Form, Button, Card, CardFooter } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Notyf } from "notyf";

import UserContext from "../context/UserContext";

export default function Login() {
  const notyf = new Notyf();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  const { setUser } = useContext(UserContext);

  function authenticate(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access !== undefined) {
          localStorage.setItem("token", data.access);
          retrieveUserDetails(data.access);

          setEmail("");
          setPassword("");

          notyf.success("Successful Login");

          navigate("/");
        } else if (data.error) {
          notyf.error("Email and Password do not match");
        }
      });
  }

  function retrieveUserDetails(token) {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        });
      });
  }

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return (
    <>
      <Form
        onSubmit={(e) => authenticate(e)}
        style={{ width: "500px" }}
        className="mx-auto"
      >
        <h1 className="my-5 text-center">Log In</h1>
        <Card>
          <Card.Body>
            <Form.Group className="mb-2">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Card.Body>

          <CardFooter className="p-3">
            {isActive ? (
              <Button
                variant="primary"
                type="submit"
                id="loginBtn"
                className="w-100"
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="primary"
                type="submit"
                id="loginBtn"
                className="w-100"
                disabled
              >
                Submit
              </Button>
            )}
          </CardFooter>
        </Card>
      </Form>

      <p className="text-center mt-3">
        Don't have an account yet?{" "}
        <Link to="/register" className="text-primary">
          Click here
        </Link>{" "}
        to register
      </p>
    </>
  );
}
