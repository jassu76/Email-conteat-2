import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const serviceId = "service_er49brg";
  const templateId = "template_wqmjn78";
  const publicKey = "gpoRMpYBn1tyNN7kH";

  const templateParams = {
    from_name: name,
    from_email: email,
    to_name: name,
    user_password: password,
    phone: phone,
  };

  //Sending Email using EmailJS
  const sendEmail = (e) => {
    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email Sent Successfully", response);
        navigate("/SignInForm");
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
      })
      .catch((error) => {
        console.error("Error Sending email : ", error);
      });
  };

  //Creating User Account using Firebase
  const createUser = async (e) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password); //Creating Account Using Firebase
      await setDoc(doc(database, "userProfiles", email), {
        name: name,
        email: email,
        phone: phone,
      });
      sendEmail();
      window.alert("Account Successfull Created");
      navigate("/SignInForm");
    } catch {
      window.alert("Please enter valid email address");
    }
  };

  //Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length < 3) window.alert("Name atleast 3 characters");
    else if (password.length < 8) window.alert("Password atleast 8 characters");
    else if (phone.length < 10 || phone.length > 10)
      window.alert("Phone number should be 10 digits");
    else {
      createUser();
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className="signupfom">
        <label>Name : </label>
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Email : </label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password : </label>
        <input
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label>Phone : </label>
        <input
          type="number"
          value={phone}
          required
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <button type="submit">Sign Up</button>
        <br />
      </form>
      <p></p>
    </div>
  );
}
