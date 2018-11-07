import React, { memo } from 'react';

const TileTitle = memo(({ title }) => {

  return <h3 className='pic-title'>{title}</h3>
});

export default TileTitle;
