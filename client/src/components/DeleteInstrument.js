import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { SERVER_HOST } from "../config/global_constants";

export default class DeleteInstrument extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToHome: false
        };
    }

    handleDelete = () => {
        axios.delete(`${SERVER_HOST}/instruments/${this.props.match.params.id}`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage);
                    } else {
                        console.log("Record deleted");
                        this.setState({ redirectToHome: true });
                    }
                } else {
                    console.log("Record not deleted");
                }
            })
            .catch(err => console.error("Error deleting instrument:", err));
    }

    render() {
        return (
            <div className="form-container">
                {this.state.redirectToHome ? <Redirect to="/home" /> : null}
                <h2>Are you sure you want to delete this instrument?</h2>
                <button className="red-button" onClick={this.handleDelete}>Confirm Deletion</button>
                <Link className="blue-button" to={"/home"}>Cancel</Link>
            </div>
        );
    }
}
