import React, {Component} from "react"
import { Link } from "react-router-dom/cjs/react-router-dom.min"



export default class addProduct extends Component 
{
    render() 
    {
        return (
            <><table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Colour</th>
                        <th></th>
                        <th>Price</th>
                        <th> </th>
                    </tr>
                </thead>

                <tbody>

                </tbody>
            </table>
            <div className="home-button">
            <Link to="/home" className="blue-button">Home</Link>
                </div></>   
        )
    }
}