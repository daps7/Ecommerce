import React from "react";
import { Link } from "react-router-dom";

const InstrumentTable = ({ instruments }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Type</th>
                    <th>Colour</th>
                    <th>Year</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {instruments.map(instrument => (
                    <tr key={instrument._id}>
                        <td>{instrument.type}</td>
                        <td>{instrument.colour}</td>
                        <td>{instrument.year}</td>
                        <td>{instrument.price}</td>
                        <td>
                            <Link to={`/editInstrument/${instrument._id}`} className="blue-button">Edit</Link>
                            <Link to={`/deleteInstrument/${instrument._id}`} className="red-button">Delete</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default InstrumentTable;
