import React, { Component } from 'react'
import { BrowserRouter, HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Home } from './index'

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact={true} component={Home} />
                </Switch>
            </Router>
        )
    }
}

export default App