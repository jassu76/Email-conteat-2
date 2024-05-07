import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInUser = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password); //Logging User using Firebase
      navigate("/Profile");
      console.log("User Logged In Successfully");
    } catch {
      console.log("You entered a wrong username or password.");
    }
  };
  return (
    <div>
      <form onSubmit={logInUser} className="signinform">
        <label>Email : </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password : </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
        <br />
      </form>
    </div>
  );
}
