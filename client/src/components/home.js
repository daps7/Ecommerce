import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../css/main.css";
import logo from "../images/logo.png";
import cart from "../images/cart.png";
import InstrumentTable from "./InstrumentTable";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instruments: [],
            isLoggedIn: false, // Track login status
            isAdmin: false, // Track admin status
            successMessage: ""
        };
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/api/instruments`)
            .then(res => {
                console.log("API Response:", res.data);

                if (res.data && !res.data.errorMessage) {
                    this.setState({ instruments: res.data });
                    console.log(res.data)
                } else {
                    console.log("Error fetching instruments:", res.data.errorMessage);
                }
            })
            .catch(err => console.error("Error fetching instruments:", err));

        // Check login status and access level
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${SERVER_HOST}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                if (res.data) {
                    this.setState({ isLoggedIn: true, successMessage: "Successfully logged in" });
                    if (res.data.accessLevel === 2) {
                        this.setState({ isAdmin: true });
                    }
                }
            })
            .catch(err => console.error("Error checking login status:", err));
        }
    }

    handleLogout = () => {
        // Handle logout logic here
        localStorage.removeItem('token');
        this.setState({ isLoggedIn: false, isAdmin: false, successMessage: "" });
    }

    render() {
        return (
            <div className="store-container">
                <nav className="store-nav">
                    <div className="store-left">
                        <img src={logo} alt="logo" className="store-logo" />
                        {this.state.isLoggedIn ? (
                            <>
                                <span>{this.state.successMessage}</span>
                                <button className="nav-button red-button" onClick={this.handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link className="nav-button green-button" to={"/Login"}>Login</Link>
                                <Link className="nav-button blue-button" to={"/Register"}>Register</Link>
                            </>
                        )}
                    </div>

                    <h1 className="nav-title">DJS Music Store</h1>

                    <div className="nav-links">
                        <div className="nav-right">
                            <Link to="/cart" className="nav-button">
                                <img src={cart} className="cart-img" alt="Cart"/>
                            </Link>
                            {this.state.isAdmin && (
                                <Link to="/addProduct" className="nav-button">Add New Product</Link>
                            )}
                        </div>
                    </div>
                </nav>

                <h2>Welcome to the DJS Store</h2>

                <section>
                    <h3>Instruments for Sale</h3>
                    
                    <div className="table-container">
                        {this.state.instruments.length > 0 ? (
                            <InstrumentTable instruments={this.state.instruments} isAdmin={this.state.isAdmin} />
                        ) : (
                            <p>Loading instruments...</p>
                        )}
                    </div>
                </section>
            </div>
        );
    }
}