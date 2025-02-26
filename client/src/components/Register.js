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
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
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

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({errorMessage: "Passwords do not match"})
            return
        }

        const user = {
            first_name: this.state.name.split(' ')[0],
            last_name: this.state.name.split(' ')[1] || '',
            username: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        axios.post(`${SERVER_HOST}/users/register`, user)
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
    }


    render() 
    {     
        return (
            <form className="form-container" noValidate={true} id="loginOrRegistrationForm">
           
                {this.state.isRegistered ? <Redirect to="/home"/> : null} 
            
                <h2>New User Registration</h2>
                
                {this.state.errorMessage && <p className="error">{this.state.errorMessage}</p>}
           
                <input  
                    name="name"              
                    type="text"
                    placeholder="Name"
                    autoComplete="name"
                    value={this.state.name}
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
                /><br/>           

                <input          
                    name="confirmPassword"    
                    type="password"
                    placeholder="Confirm password"
                    autoComplete="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                /><br/><br/>
                
                <button type="button" className="green-button" onClick={this.handleSubmit}>Register New User</button>
                <Link className="red-button" to={"/home"}>Cancel</Link>   
            </form>
        )
    }
}