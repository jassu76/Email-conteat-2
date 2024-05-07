import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const user = auth.currentUser; //getting data of currently active user

  useEffect(() => {
    const fetchData = async (e) => {
      const docRef = doc(database, "userProfiles", user.email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEmail(docSnap.data().email);
        setPhone(docSnap.data().phone);
        setName(docSnap.data().name);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("Check your internet connection");
      }
    };
    fetchData();
  }, [user.email]);

  const logoutUser = async (e) => {
    e.preventDefault();

    try {
      await signOut(auth); //Logging Out Currently Active User using Firebase
      navigate("/SignInForm");
      console.log("User Logged Out Successfully");
    } catch {
      console.log("Sorry, something went wrong. Please try again.");
    }
  };
  return (
    <>
      <div className="profile-page">
        <h1>Welcome</h1>
        <h2>{name}</h2>
        <h2>{email}</h2>
        <h2>{phone}</h2>
      </div>
      <br />
      <button className="logout" onClick={(e) => logoutUser(e)}>
        Log Out
      </button>
    </>
  );
}
