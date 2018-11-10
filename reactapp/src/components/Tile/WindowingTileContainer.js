import React from 'react'
import 'react-virtualized/styles.css'
import List from 'react-virtualized/dist/commonjs/List'
import Tile from './Tile'
import { pluralize } from '../../methods'

// doesn't work well--need to adjust custom styling to match windowing library and adjust the Tile component to maximize perf
class WindowingTileContainer extends React.Component {

  state = {
    data: null,
  }

  componentDidMount() {
    fetch("https://www.reddit.com/r/analog/top/.json")
      .then(r => r.json())
      .then(r => {
        const compiledData = r.data.children.map(el => {

          const elSummary = {}
          elSummary.id = el.data.id
          elSummary.title = el.data.title
          elSummary.author = el.data.author
          elSummary.thumbnail = el.data.thumbnail
          elSummary.picture = el.data.url
          elSummary.score = el.data.score

          let time = ((new Date().getTime() - new Date(el.data.created_utc * 1000)) / (1000 * 60 * 60))

          if (time > 24) {
            time = ((new Date().getTime() - new Date(el.data.created_utc * 1000)) / (1000 * 60 * 60 * 24)).toFixed(0)
            time = pluralize(time, `day ago`)

          } else if (time < 1) {
            time = ((new Date().getTime() - new Date(el.data.created_utc * 1000)) / (1000 * 60)).toFixed(0)
            time = pluralize(time, `minute ago`)

          } else {
            time = time.toFixed(0)
            time = pluralize(time, `hour ago`)
          }

          elSummary.creation = time

          return elSummary
        })

        this.setState({
          data: compiledData,
        }, () => console.log(`didMount`, this.state))
      })
  }

  componentDidUpdate() {
    console.log(`update`)
  }

  rowRenderer = ({
    index,
    isScrolling,
    isVisible,
    key,
    parent,
    style
  
  }) => {
    
    const tile = this.state.data[index]

    let favs = localStorage.getItem('favs')

    if (favs) {
      favs = JSON.parse(favs)

      const fav = favs.filter(el => el.id === tile.id)

      if (fav.length) {
        return <Tile key={tile.id} tile={tile} fav={true} style={style} />
      }
    }

    return (
      <Tile key={tile.id} tile={tile} fav={false} style={style} />
    )
    
  }

  noRowsRenderer = () => {
    return <div>We have no pics</div>
  }
  
  getRowHeight = ({ index }) => {
    const item = this.state.data[index]
    return item.height || 410
  }
  

  render() {

    console.log('render')

    return (
      this.state.data ? 
        <main className='tile-area'>
            
            <List 
              className='App' 
              rowRenderer={this.rowRenderer} 
              height={754} 
              width={window.innerWidth} 
              rowHeight={this.getRowHeight} 
              rowCount={this.state.data.length}
              overscanRowCount={3} 
              noRowsRenderer={this.noRowsRenderer}
            />

        </main>
      : null
    )
  }

};

export default WindowingTileContainer;