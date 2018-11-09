import React, { Component, Suspense, lazy } from 'react'
const Tile = lazy(() => import('./Tile'))


const pluralize = (num, words) => {
  if(Math.floor(num) === 1) {
    return num + ` ${words}`
  } else {
    return num + ` ${words}s`
  }
}


class TileContainer extends Component {

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
      <main className='tile-area'>
        <Suspense delayMs={1000} fallback={<div>Loading...</div>}>

          { this.state.data ? this.renderTiles() : null }

        </Suspense>
      </main>
    )
  }
}

export default TileContainer;