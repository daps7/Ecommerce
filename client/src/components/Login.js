import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import {SERVER_HOST} from "../config/global_constants"


export default class Login extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            email: "",
            password: "",
            errorMessage: "",
            isLoggedIn: false
        }
    }
    
    
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }
    
    
    handleSubmit = (e) => 
    {
        e.preventDefault()

        const loginObject = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post(`${SERVER_HOST}/users/login`, loginObject)
        .then(res => 
        {     
            if(res.data)
            {
                if (res.data.error)
                {
                    this.setState({errorMessage: res.data.error})
                }
                else // user successfully logged in
                { 
                    console.log("User logged in")                    
                    localStorage.setItem("token", res.data.token);
                    this.setState({isLoggedIn:true})
                }        
            }
            else
            {
                this.setState({errorMessage: "Login failed"})
            }
        })
        .catch(err => {
            console.error("Error logging in:", err);
            this.setState({errorMessage: err.response ? err.response.data.error : "Login failed"});
        });
    }


    render()
    {            
        return (
            <form className="form-container" noValidate={true} id="loginOrRegistrationForm">
                <h2>Login</h2>
                
                {this.state.isLoggedIn ? <Redirect to="/home"/> : null} 
                
                {this.state.errorMessage && <p className="error">{this.state.errorMessage}</p>}
                
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email"
                    autoComplete="email"
                    value={this.state.email} 
                    onChange={this.handleChange}
                /><br/>
                
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password"
                    autoComplete="password"
                    value={this.state.password} 
                    onChange={this.handleChange}
                /><br/><br/>
                
                <button type="button" className="green-button" onClick={this.handleSubmit}>Login</button>
                <Link className="red-button" to={"/home"}>Cancel</Link>                                      

            </form>
        )
    }
}