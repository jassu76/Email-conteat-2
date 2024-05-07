import "./App.css";
import Home from "./components/Home";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>                     {/* Home=Navbar */}
            <Route index element={<SignUpForm />} />              {/* SignUpForm=HomePage */}
            <Route path="SignInForm" element={<SignInForm />} />
            <Route path="SignUpForm" element={<SignUpForm />} />
            <Route path="Profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
