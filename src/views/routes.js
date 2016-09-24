import React, {Component} from "react";
import {Route, IndexRoute} from "react-router";
import App from "./layout/App";
import Starter from "./starter";
import Dashboard from "./dashboard";

export default (
        <Route path='/' component={App}>
            <IndexRoute component={Dashboard}/>
            <Route path='starter' component={Starter}/>
            <Route path='starter/:topology' component={Starter}/>
        </Route>
);