import React, {Component} from "react";
import {Route, IndexRoute} from "react-router";
import Layout from "./layout/Layout";
import Starter from "./starter";
import Dashboard from "./dashboard";
import Apps from "./apps";

export default (
        <Route path='/' component={Layout}>
            <IndexRoute component={Dashboard}/>
            <Route path='apps' component={Apps}/>
            <Route path='starter' component={Starter}/>
            <Route path='starter/:topology' component={Starter}/>
        </Route>
);