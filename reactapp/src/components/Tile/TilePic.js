import React, { memo } from 'react';


const TilePic = memo(({ picture, author, title, handleOnload, handleOnError }) => {
  
  return (
    <figure className='pic-container'>
      <img className='tile-pic' src={picture} onLoad={handleOnload} alt={`${title} by ${author}`} onError={handleOnError} />
    </figure>
  )
});

export default TilePic;