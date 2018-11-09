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
    console.log(`key:`, e.key)

    if(e.key === 'Enter') {
      this.toggleFav()
    }
  }
  

  render() {
    const { tile, style } = this.props 
    
    return (
      <React.Fragment>
        <div className='tile-wrapper'>
          <div className="tile-container" style={style} onDoubleClick={this.toggleFav} tabIndex='0' >
            <TilePic picture={tile.picture} />
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