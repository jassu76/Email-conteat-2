import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Home() {
  return (
    <>
      <nav>
        <button>
          <Link to="/SignInForm">Sign In</Link>
        </button>
        <button>
          <Link to="/SignUpForm">Sign Up</Link>
        </button>
      </nav>
      <hr></hr>
      <Outlet />
    </>
  );
}
