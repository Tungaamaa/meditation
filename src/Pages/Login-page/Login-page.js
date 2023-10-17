import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebase/firebase";
import "./Login-page.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import GoogleButton from "react-google-button";

const validateForm = yup.object().shape({
  email: yup.string().email("Please provide a valid email address.").required(),
  password: yup
    .string()
    .min(
      8,
      "Please enter a valid password. It must be more than 8 characters long."
    )
    .required(),
});

function LoginPage() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    required: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    yup
      .reach(validateForm, name)
      .validate(value)
      .then((res) => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.message });
      });
    setFormValues({ ...formValues, [name]: value });
  };

  const navigate = useNavigate();
  const handleSignUpButton = () => {
    navigate("/sign-up");
  };
  const handleSignIn = async () => {
    if (formValues.email === "" || formValues.password === "") {
      setFormErrors({ ...formErrors, required: "All fields are mandatory." });
    } else if (formErrors.email !== "" || formErrors.password !== "") {
      setFormErrors({
        ...formErrors,
        required: "Please enter a valid password or email.",
      });
    } else {
      setFormErrors({ ...formErrors, required: "" });
      await signInWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      )
        .then((res) => {
          navigate("/services");
        })
        .catch((err) => {
          setFormErrors({ ...formErrors, required: err.message });
        });
    }
  };

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((res) => {
        navigate("/services");
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, required: err.message });
      });
  };

  return (
    <div>
      <div className="login-container">
        <header className="login-header">
          <h1> Login </h1>
        </header>

        <input
          type="text"
          className="login-input"
          placeholder="Enter your email address"
          onChange={handleInput}
          value={formValues.email}
          name="email"
        />
        <input
          type="password"
          className="login-input"
          placeholder="Enter your password"
          value={formValues.password}
          onChange={handleInput}
          name="password"
        />

        <div className="forgot-password">
          <input type="checkbox" />
          <span> Forgot Password </span>
        </div>

        <button type="submit" className="login-button" onClick={handleSignIn}>
          Sign In
        </button>

        <div>
          <div className="sign-up-btn">
            <a id="sign-up-btn" onClick={handleSignUpButton}>
              Don't have an account? Sign Up
            </a>
          </div>
        </div>
      </div>
      <div>
        
        <button type="submit" className="google-sign-in" onClick={handleSignInWithGoogle}>
        Sign In With Google
        </button>
  
      </div>
      <div>
        <p>
          {formErrors.email}
          <span></span>
        </p>
      </div>
      <p>
        {formErrors.password}
        <span></span>
      </p>
      <p>
        {formErrors.required}
        <span></span>
      </p>
    </div>
  );
}

export default LoginPage;
