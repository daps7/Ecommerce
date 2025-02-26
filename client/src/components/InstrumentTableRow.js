import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class InstrumentTableRow extends Component {
    render() {
        const { instrument } = this.props; // Fixing props usage
        
        return (
            <tr>
                <td>{instrument.type}</td>
                <td>{instrument.colour}</td>
                <td>{instrument.year}</td>
                <td>{instrument.price}</td>
                <td>
                    <Link className="green-button" to={`/EditInstrument/${instrument._id}`}>Edit</Link>
                    <Link className="red-button" to={`/DeleteInstrument/${instrument._id}`}>Delete</Link>
                </td>
            </tr>
        );
    }
}
