import React from 'react';
import { serialize } from "../methods";

const StoreContext = React.createContext();

export const StoreConsumer = StoreContext.Consumer

export class StoreProvider extends React.Component {

  state = {
    favorited: 0,
    search: '/r/analog',
    handleSearch: null,
    handleFavoriting: null,
    handleUnfavoriting: null,
    favorites: [],
    data: null,
  }

  componentDidMount() {
    console.log(`ctx mounted`)
    this.handleInitialDataFetch()
    this.handlePersistingFavs()
    this.makeFunctionsAvailable()
  }

  handleInitialDataFetch = () => {
    fetch("https://www.reddit.com/r/analog/top/.json")
      .then(r => r.json())
      .then(r => {
        console.log(r);

        this.setState({
            data: r.data.children.map(el => serialize(el.data))
          },

          () => console.log(`didMount`, this.state)
        );
      });
  }
  

  handlePersistingFavs = () => {
    const savedFavs = localStorage.getItem("favs")
    const favorites = JSON.parse(savedFavs)

    if (savedFavs) {
      this.setState({

        favorites,
        favorited: favorites.length

      }, () => console.log(`StoreProvider DidMount:`, this.state))
    }
  }

  makeFunctionsAvailable = () => {

    this.setState({
      handleSearch: this.handleSearch,
      handleFavoriting: this.handleFavoriting,
      handleUnfavoriting: this.handleUnfavoriting
    });
  }

  handleFavoriting = (tile) => {
    this.setState(prevState => {

      const savedFavs = localStorage.getItem('favs')
      let newFavs

      if(savedFavs) {
        newFavs = JSON.parse(savedFavs)
      
      } else {
        newFavs = prevState.favorites
      }

      newFavs.push({...tile})

      localStorage.setItem('favs', JSON.stringify(newFavs))

      return {
        favorited: ++prevState.favorited,
        favorites: newFavs
      }
    }, () => console.log(this.state))
  }

  handleUnfavoriting = (tileId) => {

    const savedFavs = localStorage.getItem("favs")
    let newFavs
    
    this.setState(prevState => {
      
      if(savedFavs) {
        newFavs = JSON.parse(savedFavs).filter(fav => fav.id !== tileId)
      
      } else {
        newFavs = prevState.favorites.filter(fav => fav.id !== tileId)  
      }

      localStorage.setItem('favs', JSON.stringify(newFavs))

      return {
        favorited: --prevState.favorited,
        favorites: newFavs
      }
    }, () => console.log(this.state))
  }

  handleSearch = (query) => {
    this.setState(prevState => {
      return {
        search: `/r/${query}`
      }
    }, () => console.log(this.state))
  }

  render() {
    return (
      <StoreContext.Provider value={this.state}>
        { this.props.children }
      </StoreContext.Provider>
    )
  }
}