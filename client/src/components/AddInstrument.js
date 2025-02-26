import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"
import LinkInClass from "../components/LinkInClass"
import {SERVER_HOST} from "../config/global_constants"

export default class AddInstrument extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            type:"",
            colour:"",
            year:"",
            price:"",
            redirectTohome:false
        }
    }

    componentDidMount() 
    {     
        this.inputToFocus.focus()        
    }
 
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => 
    {
        e.preventDefault()

        const instrumentObject = {
            type: this.state.type,
            colour: this.state.colour,
            year: this.state.year,
            price: this.state.price
        }

        axios.post(`${SERVER_HOST}/instruments`, instrumentObject, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure token is sent
            }
        })
        .then(res => 
        {   
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                {   
                    console.log("Record added")
                    this.setState({redirectTohome:true})
                } 
            }
            else
            {
                console.log("Record not added")
            }
        })
        .catch(err => console.error("Error adding instrument:", err));
    }

    render()
    {        
        return (
            <div className="form-container"> 
                {this.state.redirectTohome ? <Redirect to="/home"/> : null}                                            
                    
                <form>
                    <label>Type</label>
                    <input ref = {(input) => { this.inputToFocus = input }} type="text" name="type" value={this.state.type} onChange={this.handleChange} />

                    <label>Colour</label>
                    <input type="text" name="colour" value={this.state.colour} onChange={this.handleChange} />

                    <label>Year</label>
                    <input type="text" name="year" value={this.state.year} onChange={this.handleChange} />

                    <label>Price</label>
                    <input type="text" name="price" value={this.state.price} onChange={this.handleChange} />
            
                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>            
                    <Link className="red-button" to={"/home"}>Cancel</Link>
                </form>
            </div>
        )
    }
}