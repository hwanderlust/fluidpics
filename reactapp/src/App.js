import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import './css/App.scss';
import Navbar from './components/Nav/Navbar';
import Home from './components/Home'

const Favorites = lazy(() => import('./components/Favorites'))

class App extends Component {

  render() {

    return (
      <div className="App">

        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/favorites" render={() => (
              <Suspense delayMs={1000} fallback={<div>Loading!</div>}>
                <Favorites />
              </Suspense>
          )} />
        </Switch>

      </div>
    );
  }
}

export default App;
