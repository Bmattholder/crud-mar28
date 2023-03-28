import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./Nav.css";

function Nav() {
  const location = useLocation();

  return (
    <header className="header">
      <Link
        to="/"
        className={`header-link ${location.pathname === "/" ? "active" : ""}`}
      >
        Sign In{" "}
      </Link>
      <Link
        to="/form"
        className={`header-link ${
          location.pathname === "/form" ? "active" : ""
        }`}
      >
        New Person
      </Link>
      <Link
        to="/list"
        className={`header-link ${
          location.pathname === "/list" ? "active" : ""
        }`}
      >
        People List
      </Link>
    </header>
  );
}

export default Nav;
