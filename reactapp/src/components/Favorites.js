import React from 'react';
import { StoreConsumer } from '../contexts/StoreContext';
import Tile from './Tile';

class Favorites extends React.Component {

  state = {
    favs: null
  }

  componentDidMount() {

    this.setState({
      favs: this.getFavorites()
    }, () => console.log(this.state))
  }

  getFavorites = () => {

    return JSON.parse(localStorage.getItem('favs'))
  }
  

  renderFavTiles = (favs) => {

    if (favs && favs.length) {
      return favs.map(fav => <Tile key={fav.id} tile={fav} fav={true}/>)
    }

    return <div className='error-msg'>Whoops! I think you've got to favorite some things first :D</div>
  }
  

  render() {

    console.log(`favs render`)

    return (

      <main className='tile-area'>
        <StoreConsumer>
          {ctx => {
            // console.log(ctx)
            return (
              <>
                {this.renderFavTiles(ctx.favorites)}
              </>
            )
          }}
        </StoreConsumer>
      </main>

      // can't bc it doesn't update when ctx changes
      // <div className='tile-area'>
      //   { this.renderFavTiles() }
      // </div>
    )
  }
};

export default Favorites;