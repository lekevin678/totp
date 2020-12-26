import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Home from "./home";
import Totp from "./totp";
import "./style/navbar.css";

class NavBar extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <nav className="navBarWrapper">
            <ul className="navBar">
              <li>
                <Link to="/" style={{ textDecoration: "none" }}>
                  {" "}
                  Home{" "}
                </Link>
              </li>
              <li>
                <Link to="/totp" style={{ textDecoration: "none" }}>
                  {" "}
                  TOTP{" "}
                </Link>
              </li>
            </ul>
          </nav>
          <Route path="/" exact component={Home} />
          <Route path="/totp" exact component={Totp} />
        </div>
      </BrowserRouter>
    );
  }
}

export default NavBar;
