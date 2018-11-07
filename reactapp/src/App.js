import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import TileContainer from './components/TileContainer';
import NavContainer from './components/NavContainer';
import { StoreProvider } from './contexts/StoreContext';
import Favorites from './components/Favorites';

class App extends Component {
  
  
  render() {

    return (
      <StoreProvider>
        <div className="App">

          <Switch>
            <Route exact path="/" component={TileContainer} />
            <Route exact path="/favorites" component={Favorites} />
          </Switch>

          <NavContainer />

        </div>
      </StoreProvider>
    );
  }
}

export default App;
