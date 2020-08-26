import React, { Component } from 'react'
import { BrowserRouter, HashRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { Home, About, NotFound } from './index'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default App
