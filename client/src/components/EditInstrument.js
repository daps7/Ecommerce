import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

export default class EditInstrument extends Component {
    constructor(props) {
        super(props);

        this.state = {
            type: "",
            colour: "",
            year: "",
            price: "",
            redirectToHome: false
        };
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/instruments/${this.props.match.params.id}`)
            .then(res => {
                if (res.data) {
                    this.setState({
                        type: res.data.type,
                        colour: res.data.colour,
                        year: res.data.year,
                        price: res.data.price
                    });
                }
            })
            .catch(err => console.error("Error fetching instrument:", err));
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const instrumentObject = {
            type: this.state.type,
            colour: this.state.colour,
            year: this.state.year,
            price: this.state.price
        };

        axios.put(`${SERVER_HOST}/instruments/${this.props.match.params.id}`, instrumentObject)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage);
                    } else {
                        console.log("Record updated");
                        this.setState({ redirectToHome: true });
                    }
                } else {
                    console.log("Record not updated");
                }
            });
    }

    render() {
        return (
            <div className="form-container">
                {this.state.redirectToHome ? <Redirect to="/home" /> : null}

                <Form>
                    <Form.Group controlId="type">
                        <Form.Label>Type</Form.Label>
                        <Form.Control type="text" name="type" value={this.state.type} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="colour">
                        <Form.Label>Colour</Form.Label>
                        <Form.Control type="text" name="colour" value={this.state.colour} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="year">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="text" name="year" value={this.state.year} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group>

                    <button className="green-button" onClick={this.handleSubmit}>Update</button>
                    <Link className="red-button" to={"/home"}>Cancel</Link>
                </Form>
            </div>
        );
    }
}
