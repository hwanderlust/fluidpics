import React from 'react';
import NavItem from './NavItem';
import { withRouter } from 'react-router-dom';

class Nav extends React.PureComponent {

  state = {
    navLocations: ["/r/analog", "favorites"],
    active: '/r/analog',
  };

  componentDidMount() {
    // console.log(`navcontainer:`, window.location.pathname)

    const route = window.location.pathname
    if(route === '/favorites') {
      this.setState({
        active: 'favorites'
      }, () => console.log(this.state))
    }
  }

  renderItems = () => {
    
    return this.state.navLocations.map((loc, idx) => {

      console.log(`inside map update`)

      return <NavItem key={idx} title={loc} active={this.state.active} toggleActive={this.handleActive} />
    })
  }

  handleActive = (clickedTitle) => {
    this.setState(prevState => {
      return { 
        active: clickedTitle
      };
    
    }, () => {
      if(clickedTitle === 'favorites') {
        this.props.history.push('/favorites')
      
      } else {
        this.props.history.push('/')
      }
    })
  }
  
  render() {


    return (
      <nav className='nav-bar'>
        { this.renderItems() }
      </nav>
    );
  }
} 

export default withRouter(Nav)