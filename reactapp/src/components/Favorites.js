import React from 'react';
import { StoreConsumer } from '../contexts/StoreContext';
import Tile from './Tile';

class Favorites extends React.Component {

  renderFavTiles = (favs) => {
    
    if(favs.length) {
      return favs.map(fav => <Tile key={fav.id} tile={fav} fav={true}/>)
    }

    return <div className='error-msg'>Whoops! I think you've got to favorite some things first :D</div>
  }
  

  render() {
    return (
      <div className='tile-area'>
        <StoreConsumer>
          { ctx => {
            console.log(ctx)
            return (
              <>
              { this.renderFavTiles(ctx.favorites) }
              </>
            )
          }}
        </StoreConsumer>
      </div>
    )
  }
};

export default Favorites;