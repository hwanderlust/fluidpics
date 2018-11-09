import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
// import TileContainer from './components/TileContainer';
import NavContainer from './components/NavContainer';
import Home from './components/Home'
// import WindowingTileContainer from './components/WindowingTileContainer';

const Favorites = lazy(() => import('./components/Favorites'))

class App extends Component {

  render() {

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route exact path="/" component={TileContainer} /> */}
          {/* <Route exact path="/" component={WindowingTileContainer} /> */}
          <Route exact path="/favorites" render={() => (
              <Suspense delayMs={1000} fallback={<div>Loading!</div>}>
                <Favorites />
              </Suspense>
          )} />
        </Switch>

        <NavContainer />
      </div>
    );
  }
}

export default App;
