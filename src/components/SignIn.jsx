import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SignIn.css";
function SignIn(props) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { email, password } = loginForm;

  const loginSubmit = () => {
    console.log(loginForm);
    navigate("/form");
  };

  const onChange = (e) => {
    setLoginForm((p) => ({
      ...p,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="sign-in-form">
      <h1>Login</h1>
      <input
        type="email"
        className="sign-in-input"
        name="email"
        id="email"
        value={email}
        placeholder="Email"
        onChange={onChange}
        required
      />{" "}
      <input
        type="password"
        className="sign-in-input"
        name="password"
        id="password"
        value={password}
        placeholder="Password"
        onChange={onChange}
        required
      />
      <button onClick={loginSubmit} className="sign-in-button">
        Login
      </button>
    </form>
  );
}

export default SignIn;
