import React, { memo } from 'react';

const TileTitle = memo(({ title, url }) => {

  return (
    <a href={url} target='_blank' rel="noopener noreferrer" className='pic-title'>
      <h3>{title}</h3>
    </a>
  )
});

export default TileTitle;
