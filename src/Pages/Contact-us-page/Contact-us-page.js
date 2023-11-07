import React, { useState } from "react";
import { addDoc } from "firebase/firestore";

//INTERNAL IMPORT
import { subscribeCollection } from "../../firebase/firebase";
import contact from "../../images/contact-us.jpeg";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import "./Contact-us-page.css";


function ContactUsPage() {
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    message: "",
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (
      formValues.firstname === "" ||
      formValues.lastname === "" ||
      formValues.email === "" ||
      formValues.message === ""
    ) {
      alert("Please complete all required fields");
    } else {
      await addDoc(subscribeCollection, {
        name: formValues.firstname,
        email: formValues.email,
        message: formValues.message,
      })
        .then((response) => {
          setFormValues({
            firstname: "",
            lastname: "",
            email: "",
            message: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Header />

      <div className="contact-us-page-content">
        <div className="contact-us-page-image">
          <img className="contact-us-page-main-picture" src={contact} />
        </div>

        <form className="contact-us-page-subscribe-form">
          <h1>Get in touch</h1>
          <h4>Send Message</h4>

          <input
            type="text"
            className="subscribe-input"
            name="firstname"
            onChange={handleInput}
            placeholder="First Name"
            value ={formValues.firstname}
          ></input>
          <input
            type="text"
            className="subscribe-input"
            name="lastname"
            onChange={handleInput}
            placeholder="Last Name"
            value ={formValues.lastname}
          ></input>
          <input
            type="email"
            className="subscribe-input"
            name="email"
            onChange={handleInput}
            placeholder="Email address"
            value={formValues.email}
          ></input>
          <textarea
            type="text"
            className="subscribe-input-message"
            name="message"
            onChange={handleInput}
            value={formValues.message}
            placeholder="message"
            rows={8}
          ></textarea>
          <button
            type="submit"
            onClick={handleSubscribe}
            className="send-message-button"
          >
            Send
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUsPage;
