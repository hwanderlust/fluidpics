import React, { memo } from 'react';


const TilePic = memo(({ picture, author, title, handleOnload }) => {
  
  return (
    <div className='pic-container'>
      <img className='tile-pic' src={picture} onLoad={handleOnload} alt={`${title} by ${author}`} />
    </div>
  )
});

export default TilePic;