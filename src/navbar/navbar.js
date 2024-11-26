import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import LOGO from "../img/LOGO.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="Navbar-icon">
        <img
          src={LOGO}
          alt=""
          className="Navbar-Log_point"
          onClick={() => navigate("/")}
        />
      </div>
      <span>
        <div className="Navbar-ranking">
          <Link to="/ranking">랭킹</Link>
        </div>
        <div className="Navbar-community">
          <Link to="/community">커뮤니티</Link>
        </div>
        <div className="Navbar-function">
          <Link to="/function">감도 측정하기</Link>
        </div>
        <div className="Navbar-signin">
          <Link to="/signin">로그인</Link>
        </div>
      </span>
    </div>
  );
};

export default Navbar;
