import React, { memo } from 'react'

const TileDetails = memo(({ tile }) => {

  return (
    <figcaption className='pic-details'>
      <span><i className='fas fa-user'></i>{` ${tile.author}`}</span>
      <span><i className='far fa-clock'></i>{` ${tile.creation}`}</span>
      <span><i className='fas fa-bolt'></i>{` ${tile.score}`}</span>
    </figcaption>
  )
})

export default TileDetails;