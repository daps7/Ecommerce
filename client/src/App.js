import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import home from "./components/home"
import addProduct from "./components/addProduct"
import cart from "./components/cart"
import Login from "./components/Login"
import Register from "./components/Register"

    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>
		    <Route exact path="/Login" component={Login} /> 
                    <Route exact path="/Register" component={Register} />
                    <Route exact path = "/addProduct" component = {addProduct} />
                    <Route exact path = "/cart" component = {cart} />
                    <Route exact path="/" component={home} />
                    <Route exact path="/home" component={home}/> 
                    <Route path="*" component={home}/>                            
                </Switch>
            </BrowserRouter>
        )
    }
}