import React from 'react'
import Tile from './Tile'
import { StoreConsumer } from "../contexts/StoreContext";

const pluralize = (num, words) => {
  if(Math.floor(num) === 1) {
    return num + ` ${words}`
  } else {
    return num + ` ${words}s`
  }
}

export default class TileContainer extends React.Component {
  
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
          
          if(time > 24) {
            time = ((new Date().getTime() - new Date(el.data.created_utc * 1000)) / (1000 * 60 * 60 * 24)).toFixed(0)
            time = pluralize(time, `day ago`)
            
          } else if(time < 1) {
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

  renderTiles = () => {
    return this.state.data.map(tile => {

      let favs = localStorage.getItem('favs')

      if (favs) {
        favs = JSON.parse(favs)

        const fav = favs.filter(el => el.id === tile.id)

        if (fav.length) {
          return <Tile key={tile.id} tile={tile} fav={true} />
        }
      }

      return <Tile key={tile.id} tile={tile} fav={false} />
    })
  }

  render() {
    return (
      <div className='tile-area'>
        <StoreConsumer>

          { ctx => {
            // console.log(ctx)
            return this.state.data ? this.renderTiles() : null
          }}

        </StoreConsumer>
      </div>
    )
  }
}