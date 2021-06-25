import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Error from './Error';
import Hi from './hi';
import Home from './home';
import RocketDetail from './RocketDetail';
import React from 'react';

function App() {
  return (
    <Router>
      <div>
        <span>
          <Link to="/">Home</Link>
          <Link to="/rockets">Rockets</Link>
        </span>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route path="/rockets" component={Hi} />

          <Route path="/rockets/:id" component={RocketDetail} />

          <Route path="/not/found" component={Error} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
