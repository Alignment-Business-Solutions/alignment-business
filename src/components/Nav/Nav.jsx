import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Alignment Business Solutions</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id ? (
          <>
            <Link className="navLink" to="/login">
              Login
            </Link>

            <Link className="navLink" to="/registration">
              Register
            </Link>

            <Link className="navLink" to="/about">
              About Us
            </Link>
          </>
        ) : // If CLIENT-LEVEL user is logged in, show these links:
        user.access_level === 0 ? (
          <>
            <Link className="navLink" to="/user">
              Summary
            </Link>

            <Link className="navLink" to="/about">
              About Us
            </Link>
            <Link className="navLink" to="/clients">
              Clients
            </Link>

            <LogOutButton className="navLink" />
          </>
        ) : // If ACCOUNTANT-LEVEL user is logged in, show these links:
        user.access_level === 1 ? (
          <>
            <Link className="navLink" to="/accountant">
              Accountant Dashboard
            </Link>

            <Link className="navLink" to="/clients">
              Clients
            </Link>

            <Link className="navLink" to="/user">
              Summary
            </Link>

            <Link className="navLink" to="/balance">
              Balance
            </Link>

            <Link className="navLink" to="/profitloss">
              P&L
            </Link>

            <Link className="navLink" to="/cashflow">
              Cash Flow
            </Link>

            <LogOutButton className="navLink" />
          </>
        ) : (
          // If ADMIN-LEVEL user is logged in, show these links:
          <>
            <Link className="navLink" to="/admin">
              Admin Dashboard
            </Link>

            <Link className="navLink" to="/clients">
              Clients
            </Link>

            <Link className="navLink" to="/user">
              Summary
            </Link>

            <Link className="navLink" to="/balance">
              Balance
            </Link>

            <Link className="navLink" to="/profitloss">
              P&L
            </Link>

            <Link className="navLink" to="/cashflow">
              Cash Flow
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;