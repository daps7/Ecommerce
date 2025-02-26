import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {SERVER_HOST} from "../config/global_constants"


export default class Register extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            username: "",
            email: "",
            password: "",
            accessLevel: 1, // Default access level for registered users
            errorMessage: "",
            isRegistered: false
        } 
    }
    
    
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }
    
    
    handleSubmit = (e) => 
    {
        e.preventDefault()

        const registerObject = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            accessLevel: this.state.accessLevel
        }

        axios.post(`${SERVER_HOST}/users/register`, registerObject)
        .then(res => 
        {     
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    this.setState({errorMessage: res.data.errorMessage})
                }
                else // user successfully registered
                { 
                    console.log("User registered")                    
                    this.setState({isRegistered:true})
                }        
            }
            else
            {
                this.setState({errorMessage: "Registration failed"})
            }
        })
        .catch(err => {
            console.error("Error registering:", err);
            this.setState({errorMessage: "Registration failed"});
        });
    }


    render() 
    {     
        return (
            <form className="form-container" noValidate={true} id="loginOrRegistrationForm">
           
                {this.state.isRegistered ? <Redirect to="/login"/> : null} 
            
                <h2>Register</h2>
                
                {this.state.errorMessage && <p className="error">{this.state.errorMessage}</p>}
           
                <input  
                    name="username"              
                    type="text"
                    placeholder="Username"
                    autoComplete="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                /><br/>           

                <input  
                    name="email"              
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                /><br/>              

                <input  
                    name="password"           
                    type="password"
                    placeholder="Password"
                    autoComplete="password"
                    title="Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)"
                    value={this.state.password}
                    onChange={this.handleChange}
                /><br/><br/>
                
                <button type="button" className="green-button" onClick={this.handleSubmit}>Register</button>
                <Link className="red-button" to={"/home"}>Cancel</Link>   
            </form>
        )
    }
}