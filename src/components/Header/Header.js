import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useStore } from "../../stored/store";

function Header() {
  const hederRef = useRef(null);
  const user = useStore((state) => state.user);
  const loading = useStore((state) => state.loading);

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50
        ? hederRef?.current?.classList?.add("fixed")
        : hederRef?.current?.classList?.remove("fixed");
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const [showMenu, setShowMenu] = useState(false);

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div ref={hederRef} className="header">
      <div
        className="header-list"
        style={{
          left: showMenu ? "0%" : "-100%",
        }}
      >
        <Link to="/" className="header-logo">
          <box-icon color="#e74c3c" size="md" name="movie"></box-icon>{" "}
          <span>PHIMMOI</span>
        </Link>

        <ul className="nav-menu">
          <li onClick={closeMenu}>
            <NavLink activeclassname="active" to="/">
              Home
            </NavLink>
          </li>
          <li onClick={closeMenu}>
            <NavLink activeclassname="active" to="/movies">
              Movies
            </NavLink>
          </li>
          <li onClick={closeMenu}>
            <NavLink activeclassname="active" to="/tv_shows">
              TV Shows
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="toggle-menu-icon" onClick={() => setShowMenu(!showMenu)}>
        <div className={`bar menu ${showMenu ? "close" : ""}`}>
          <span></span>
          <span></span>
        </div>
      </div>

      <Link to="/" className="header-logo-mobile">
        <span>PHIMMOI</span>
      </Link>

      <div className="header-info">
        <Link className="header-search" to="/search">
          <box-icon size="md" color="#e74c3c" name="search-alt-2"></box-icon>
        </Link>

        {user ? (
          <div className="header-user">
            <img alt="avatar" src={user.photoURL} />
            <ul className="header-user-list">
              <li className="header-user-item">{user.displayName}</li>
              <li className="header-user-item">{user.email}</li>
              <li className="header-user-item">
                <Link to="/favorite-movie">My Favorite Movie</Link>
              </li>
              <li className="header-user-item" onClick={logOut}>
                Log Out
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className={`bnt-login ${loading ? "disabled-link" : ""}`}
          >
            {loading ? "Loading..." : "Login"}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
