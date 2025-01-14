import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import auth from "../utils/auth";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    auth.logout();
    navigate("/");
    setIsOpen(false);
  };

  const handleNewTicket = () => {
    setIsOpen(false);
  };

  const handleHome = () => {
    setIsOpen(false);
  };

  return (
    <div className="hamburger-menu">
      <button
        className="hamburger-button"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {isOpen && (
        <div className="hamburger-dropdown">
          <Link to="/dashboard" onClick={handleHome}>
            <button type="button" className="menu-button">
              Home
            </button>
          </Link>
          <Link to="/create" onClick={handleNewTicket}>
            <button type="button" className="menu-button">
              New Ticket
            </button>
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
