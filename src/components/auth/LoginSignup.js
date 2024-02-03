import React, { useState } from "react";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import styles from "./LoginSignup.module.css";
import { useSelector, useDispatch } from "react-redux";

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPasword, setCnfPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const nav = useNavigate()

  let headingText = "SignUp";
  let subBtnText = "Sign up";
  let btnText = "Have an account? Login";

  const handleSignUp = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqZwDjnF43ZY2c_T6j07yTFfJsQ1_09Rc",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Registration failed:", errorData.error.message);
        setErrorMessage(errorData.error.message);
        // alert("Registration failed");
        return;
      }

      const data = await response.json();
      console.log("Registration successful:", data);
      setErrorMessage("");
      setEmail("");
      setPassword("");
      setCnfPassword("");
      alert("Registration successful");
    } catch (error) {
      console.error("Registration error:", error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDqZwDjnF43ZY2c_T6j07yTFfJsQ1_09Rc",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login failed:", errorData.error.message);
        setErrorMessage(errorData.error.message);
        return;
      }
  
      const jsonData = await response.json(); // Store the result in a variable
      console.log("Login successful:", jsonData.idToken);
      
      localStorage.setItem("token", jsonData.idToken);
      nav("/mail");
      setEmail("");
      setPassword("");
      setErrorMessage("");
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };
  

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (isSignup && password !== cnfPasword) {
      setErrorMessage("password doesn't match");
      return;
    }
    if (isSignup) {
      handleSignUp();
    } else {
      handleLogin();
    }
  };

  const handleAuthSubmit = () => {
    setIsSignup((prev) => {
      return !prev;
    });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCnfPasswordChange = (event) => {
    setCnfPassword(event.target.value);
  };

  if (!isSignup) {
    headingText = "Login";
    subBtnText = "Login";
    btnText = "Don't have an account? Register";
  }

  return (
    <Container className={styles["main-div"]}>
      <Row className="justify-content-center">
        <Col md={6}>
          <p className={styles.heading}>{headingText}</p>
          <Form onSubmit={handleFormSubmit} className={styles["auth-form"]}>
            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className={!isSignup ? styles["login-input"] : ""}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className={!isSignup ? styles["login-input"] : ""}
                required
              />
            </Form.Group>
            {isSignup && (
              <Form.Group>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={cnfPasword}
                  onChange={handleCnfPasswordChange}
                  required
                />
              </Form.Group>
            )}

            {errorMessage.length > 0 && (
              <Alert variant="danger" className={styles["error-message"]}>
                {errorMessage}
              </Alert>
            )}

            {!isSignup && (
              <div>
                <Link to="/forget"> forgot password? </Link>{" "}
              </div>
            )}

            <Button type="submit" variant="primary">
              {subBtnText}
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Button className={styles["already-btn"]} onClick={handleAuthSubmit}>
          {btnText}
        </Button>
      </Row>
    </Container>
  );
};

export default LoginSignup;
