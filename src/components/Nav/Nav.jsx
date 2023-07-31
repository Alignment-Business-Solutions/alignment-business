import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import logo from './ABS_logo.png';

function Nav() {
    
    const user = useSelector((store) => store.user);
    const client = useSelector((store) => store.selectedClient);
    const viewSummary = `/viewsummary/${client.id}`;
    const viewBalance = `/balance/${client.id}`;
    const viewAllpl = `/allPL/${client.id}`;
    const viewCashFlow = `/cashflow/${client.id}`; 

    return (
        <div className="nav">
          <Link to="/home">
            <img className="nav-title" src={logo} alt="Logo"></img>
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
                <Link className="navLink" to={viewSummary}>
                  Summary
                </Link>

                <Link className="navLink" to="/about">
                  About Us
                </Link> 

                <LogOutButton className="navLink" />
              </>
            ) : // If ACCOUNTANT-LEVEL user is logged in, show these links:
            user.access_level === 1 ? (
              <>
                <Link className="navLink" to="/myClients">
                  My Clients
                </Link>

                {client.company_name !== undefined ? (
                    <>
                        <Link className="navLink" to={viewSummary}> 
                            {client.company_name}
                        </Link>

                        <Link className="navLink" to={viewBalance}>
                            Balance
                        </Link>

                        <Link className="navLink" to={viewAllpl}>
                            P&L
                        </Link>

                        <Link className="navLink" to={viewCashFlow}>
                            Cash Flow
                        </Link>
                    </>
                ):(<></>)}

                <LogOutButton className="navLink" />

              </>
            ) : (
              // If ADMIN-LEVEL user is logged in, show these links:
              <>
                <Link className="navLink" to="/myClients">
                  Clients
                </Link>

                {client.company_name !== undefined ? (
                    <>
                        <Link className="navLink" to={viewSummary}> 
                            {client.company_name}
                        </Link>

                        <Link className="navLink" to={viewBalance}>
                            Balance
                        </Link>

                        <Link className="navLink" to={viewAllpl}>
                            P&L
                        </Link>

                        <Link className="navLink" to={viewCashFlow}>
                            Cash Flow
                        </Link>
                    </>
                ):(<></>)}

                <LogOutButton className="navLink" />
              </>
            )}
          </div>
        </div>
      );
}

export default Nav;
