import React, { Suspense, lazy, PureComponent } from 'react'
import { StoreConsumer } from "../contexts/StoreContext";
// import TilePic from './TilePic';
import TileThumbnail from './TileThumbnail';
import TileTitle from './TileTitle';
import TileDetails from './TileDetails';
const TilePic = lazy(() => import('./TilePic'))

const originalStyle = {
  position: 'relative',
  top: '50%',
  left: '55%',
  fontSize: '3em',
}

const favStyle = {
  color: 'red',
  transition: 'ease-in-out 50ms'
}


class Tile extends PureComponent {
  
  static contextType = StoreConsumer;
  
  state = {
    fav: false,
    loaded: false
  }
  
  componentDidMount() {

    if(this.props.fav) {
      this.setState({
        fav: true
      })
    }
  }
  
  toggleFav = () => {
    
    const { handleFavoriting, handleUnfavoriting } = this.context
    const { tile } = this.props 

    this.setState(prevState => {
      
      if(prevState.fav) {
        handleUnfavoriting(tile.id)
        
      } else {
        handleFavoriting(tile)
      }
      
      return {
        fav: !prevState.fav
      }
    }, () => {
      console.log(this.state)
    })
  }
  
  handleIconStyles = () => {
    
    if(this.state.fav) {
      return {...originalStyle, ...favStyle}
      
    } else {
      return originalStyle
    }
  }
  
  handleOnload = () => {
    this.setState(prevState => {
      return {
        loaded: true
      }
    })
  }

  asyncRenderPic = (pic) => {
    return (
      <Suspense>
        <TilePic picture={ pic } />
      </Suspense>
    )
  }
  

  render() {
    const { tile, style } = this.props 
    
    return (
      
      <div className='tile-container' style={style} onDoubleClick={this.toggleFav}  >
        {<i className='fab fa-gratipay' style={this.handleIconStyles()} onClick={this.toggleFav}></i> }

        { this.state.loaded ? this.asyncRenderPic(tile.picture) : <TileThumbnail thumbnail={ tile.thumbnail } handleOnload={this.handleOnload} /> }

        <TileTitle title={ tile.title } />
        <TileDetails tile={tile} />
      </div>

    )
  }
}

export default Tile