
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import styles from "../styles/NavBar.module.css";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../context/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/Utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSIgnOut = async (e) => {
    e.preventDefault();
    try {
      axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (error) {
      console.log(error);
    }
  };

  const addPostIcon = (
    <NavLink
      to="/posts/create/"
      className={styles.NavLink}
      activeClassName={styles.Active}
    >
      {" "}
      <i className="fas fa-plus-square"></i>Add post
    </NavLink>
  );
  const loggedInIcons = (
    <>
      {" "}
      <NavLink
        to="/feed"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        {" "}
        <i className="fas fa-stream"></i> Feed
      </NavLink>
      <NavLink
        to="/liked"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        {" "}
        <i className="fas fa-heart"></i> Liked
      </NavLink>
      <NavLink to="/" className={styles.NavLink} onClick={handleSIgnOut}>
        {" "}
        <i className="fas fa-sign-out-alt"></i> Sign out
      </NavLink>
      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={styles.NavLink}
        onClick={() => {}}
      >
        <Avatar src={currentUser?.profile_image} text={currentUser?.username} />
      </NavLink>
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink
        to="/signin"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        {" "}
        <i className="fas fa-sign-in-alt"></i> Sign In
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        {" "}
        <i className="fas fa-user-plus"></i> Sign Up
      </NavLink>
    </>
  );

  return (
    <Container>
      <Navbar
        expanded={expanded}
        expand="md"
        fixed="top"
        className={styles.NavBar}
      >
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="45" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addPostIcon}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink
              exact
              to="/"
              className={styles.NavLink}
              activeClassName={styles.Active}
            >
              {" "}
              <i className="fas fa-home"></i>Home
            </NavLink>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};
export default NavBar;
