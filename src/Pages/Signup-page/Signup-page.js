import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc } from "firebase/firestore";

//INTERNAL IMPORT
import { auth, usersCollection } from "../../firebase/firebase";
import signupPageImage from "../../images/sign-up.jpeg";
import "./Signup-page.css";

const validateForm = yup.object().shape({
  name: yup.string().min(4, "Please enter your complete name.").required(),
  email: yup.string().email("Please provide a valid email address.").required(),
  password: yup
    .string()
    .min(
      8,
      "Please enter a valid password. It must be more than 8 characters long."
    )
    .required(),
  confirmPassword: yup
    .string()
    .min(
      8,
      "Please enter a valid password. It must be more than 8 characters long."
    )
    .required(),
});

function SignupForm() {
  const navigate = useNavigate();
  const navigateToSignInPage = () => {
    navigate("/");
  };

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    required: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    required: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e) => {
    setShowPassword(e.target.checked);
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    yup
      .reach(validateForm, name)
      .validate(value)
      .then((response) => {
        console.log("response");
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((error) => {
        console.log(error.message);
        setFormErrors({ ...formErrors, [name]: error.message });
      });
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSignUp = async (e) => {
    if (formValues.password !== formValues.confirmPassword) {
      // checks if password matches with confirmPassword
      setFormErrors({
        ...formErrors,
        confirmPassword: "Ensure it matches the password.",
      });
    } else if (
      // checks if any inputs are empty
      formValues.name === "" ||
      formValues.email === "" ||
      formValues.password === "" ||
      formValues.confirmPassword === ""
    ) {
      setFormErrors({ ...formErrors, required: "All fields are mandatory." });
    } else if (
      // checks if there is any errors
      formErrors.name !== "" ||
      formErrors.email !== "" ||
      formErrors.password !== "" ||
      formErrors.confirmPassword !== ""
    ) {
      setFormErrors({
        ...formErrors,
        required: "Please ensure that all errors have been resolved.",
      });
    } else {
      setFormErrors({ ...formErrors, required: "" });
      await createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      )
        .then((response) => {
          const userId = response.user.uid;
          updateProfile(response.user, { displayName: formValues.name });
          addDoc(usersCollection, {
            userId: userId,
            email: formValues.email,
            name: formValues.name,
          });
          navigate("/");
        })
        .catch((error) => {
          setFormErrors({ ...formErrors, required: error.message });
        });
    }
  };

  return (
    <div>
      <div className="signup-page-content">
        <div className="signup-page-image">
          <img src={signupPageImage} />
        </div>

        <div className="signup-page-form-content">
          <div className="login-container">
            <header className="login-header">
              <h1> Create Account </h1>
            </header>

            <input
              type="text"
              name="name"
              className="login-input"
              placeholder="Full Name"
              value={formValues.name}
              onChange={handleInput}
            />
            <input
              type="email"
              name="email"
              className="login-input"
              placeholder="Email Address"
              value={formValues.email}
              onChange={handleInput}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="login-input"
              placeholder="Password"
              value={formValues.password}
              onChange={handleInput}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              className="login-input"
              placeholder="Confirm your password"
              value={formValues.confirmPassword}
              onChange={handleInput}
            />
            <div className="show-password">
              <input type="checkbox" onChange={handleShowPassword} />
              <span> Show Password </span>
            </div>
            <h1>{formErrors.required}</h1>
            <button
              type="submit"
              className="signup-button"
              onClick={handleSignUp}
            >
              Sign Up
            </button>

            <footer>
              <div>
                {" "}
                <a onClick={navigateToSignInPage} id="sign-in-btn">
                  Already have an account? Sign In
                </a>
              </div>
              <p>

                {formErrors.name}
                <span></span>
              </p>
              <p>
                {formErrors.email}
                <span></span>
              </p>
              <p>
                {formErrors.password}
                <span></span>
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
