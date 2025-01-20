import { useState, useEffect } from "react";
import { Form, Button, Card, CardFooter } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Notyf } from "notyf";

export default function Register() {
  const notyf = new Notyf();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword &&
      mobileNo.length === 11
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, password, confirmPassword]);

  function registerUser(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Registered successfully") {
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobileNo("");
          setPassword("");
          setConfirmPassword("");

          notyf.success("Registered Successfully");

          navigate("/login");
        } else {
          notyf.error(data.error || "Please check your registration details");
        }
      });
  }

  return (
    <>
      <Form
        onSubmit={(e) => registerUser(e)}
        style={{ width: "500px" }}
        className="mx-auto"
      >
        <h1 className="my-3 text-center">Register</h1>
        <Card>
          <Card.Body>
            <Form.Group className="mb-2">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your First Name"
                required
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Last Name"
                required
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Mobile No:</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your 11-digit mobile number"
                required
                value={mobileNo}
                onChange={(e) => {
                  setMobileNo(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your Password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Verify Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Verify your Password"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Form.Group>
          </Card.Body>
          <CardFooter className="p-3">
            {isActive ? (
              <Button
                variant="primary"
                type="submit"
                id="submitBtn"
                className="w-100"
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="danger"
                type="submit"
                id="submitBtn"
                className="w-100"
                disabled
              >
                Please enter your registration details
              </Button>
            )}
          </CardFooter>
        </Card>
      </Form>
      <div className="text-center mt-4">
        <p>
          Already have an account?{" "}
          <a href="/login" className="text-primary">
            Click here
          </a>{" "}
          to log in.
        </p>
      </div>
    </>
  );
}
