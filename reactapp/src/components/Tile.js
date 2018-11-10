import React, { PureComponent } from 'react'
import { StoreConsumer } from "../contexts/StoreContext";
import TileTitle from './TileTitle';
import TileDetails from './TileDetails';
import TilePic from './TilePic';

class Tile extends PureComponent {
  
  static contextType = StoreConsumer;
  
  constructor(props) {
    super(props)

    this.state = {
      fav: false,
      loaded: false,
      touched: 0,
      timeStamp: 0,
    }

    this.favIcon = React.createRef()
  };

  componentDidMount() {
    if(this.props.fav) {

      this.favIcon.current.className += ` red`;

      this.setState({
        fav: true
      })
    }
  }

  toggleFavClass = () => {

    const iconClass = this.favIcon.current.className;

    if(this.state.fav) {
      this.favIcon.current.className = iconClass.slice(0, iconClass.length - 4);
      
    } else {
      this.favIcon.current.className += ` red`;
    }
  }
  
  
  toggleFav = () => {
    const { handleFavoriting, handleUnfavoriting } = this.context
    const { tile } = this.props 

    this.toggleFavClass()

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

  handleKeyPress = (e) => {

    if(e.key === 'Enter') {
      this.toggleFav()
    }
  }

  handleOnload = () => {
    this.setState({
      loaded: true
    })
  }
  
  handleTouch = (e) => {
    e.persist()
    let previousState;

    this.setState(prevState => {
      previousState = prevState;

      return {
        touched: prevState.touched < 2 ? ++prevState.touched : 1,
        timeStamp: e.timeStamp
      }
    
    }, () => {

      if(this.state.touched === 2 && this.state.timeStamp - previousState.timeStamp <= 1000) {
        this.toggleFav()
      } 
    })
  }
  

  render() {
    const { tile, style } = this.props 
    
    return (
      <React.Fragment>
        <div className='tile-wrapper' onTouchStartCapture={this.handleTouch}>
          <div className="tile-container" style={style} onDoubleClick={this.toggleFav} tabIndex='0' >

            <TilePic 
              picture={this.state.loaded ? tile.picture : tile.thumbnail} 
              title={tile.title} 
              author={tile.author} 
              handleOnload={this.handleOnload} 
            />
            
            <TileTitle title={tile.title} />
            <TileDetails tile={tile} />
          
          </div>

          <i ref={this.favIcon} className="fab fa-gratipay fav-icon" onClick={this.toggleFav} onKeyPress={this.handleKeyPress} tabIndex='0'/>
        
        </div>
      </React.Fragment>
    )
  }
}

export default Tile