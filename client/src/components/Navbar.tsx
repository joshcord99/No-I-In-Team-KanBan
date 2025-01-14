import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  const checkLogin = () => {
    const isLoggedIn = auth.loggedIn();
    setLoginCheck(isLoggedIn);
  };

  useEffect(() => {
    checkLogin();

    const handleAuthChange = () => {
      checkLogin();
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  return (
    <div className="nav">
      <div className="nav-title">
        <Link to="/">No-I-In-Team-Kan-Ban</Link>
      </div>
      <ul>
        {loginCheck && (
          <li className="nav-item">
            <HamburgerMenu />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
