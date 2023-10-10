import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, HashRouter, Route, Switch } from "react-router-dom";
import HomeV1 from './components/home-v1';



import ShopLeftSidebar from './components/shop-left-sidebar';

import MyAccount from './components/my-account';
import Login from './components/login';
import Register from './components/register';



class Root extends Component {
    render() {
        return(
                <HashRouter basename="/">
	                <div>
	                <Switch>
	                    <Route exact path="/" component={HomeV1} />
                        <Route path="/shop-left-sidebar" component={ShopLeftSidebar} />

                        <Route path="/my-account" component={ MyAccount } />
                        <Route path="/login" component={ Login } />
                        <Route path="/register" component={ Register } />
	                </Switch>
	                </div>
                </HashRouter>
        )
    }
}

export default Root;

ReactDOM.render(<Root />, document.getElementById('quarter'));
