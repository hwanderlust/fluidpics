import React from 'react'
import { StoreConsumer } from "../contexts/StoreContext";
import TilePic from './TilePic';
import TileTitle from './TileTitle';
import TileDetails from './TileDetails';

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


class Tile extends React.PureComponent {

  state = {
    fav: false
  }

  componentDidMount() {

    if(this.props.fav) {
      this.setState({
        fav: true
      })
    }
  }

  toggleFav = (handleFavoriting, handleUnfavoriting, tile) => {
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


  render() {
    const { tile } = this.props 

    return (

      <StoreConsumer>
        { ctx => {
          
          return (
          
            <div className='tile-container' onDoubleClick={() => this.toggleFav(ctx.handleFavoriting, ctx.handleUnfavoriting, tile)}  >
              {<i className='fab fa-gratipay' style={this.handleIconStyles()} onClick={() => this.toggleFav(ctx.handleFavoriting, ctx.handleUnfavoriting, tile)}></i> }
              <TilePic picture={ tile.picture }/>
              <TileTitle title={ tile.title } />
              <TileDetails tile={tile} />
          </div>
          
          )
        }}
        </StoreConsumer>

    )
  }
}

export default Tile