import React, { Component } from "react";
import InstrumentTableRow from "./InstrumentTableRow"; // Ensure this file exists

export default class InstrumentTable extends Component {
    render() {
        console.log("InstrumentTable received:", this.props.instruments); // Debugging
        
        return (
            <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Colour</th>
                        <th>Year</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.instruments?.length > 0 ? (
                        this.props.instruments.map((instrument) => (
                            <InstrumentTableRow key={instrument._id} instrument={instrument} />
                        ))
                    ) : (
                        <tr><td colSpan="5">No instruments found</td></tr>
                    )}
                </tbody>
            </table>
        );
    }
}
