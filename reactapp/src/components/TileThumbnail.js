import React, { memo } from 'react';


const TileThumbnail = memo(({ thumbnail, handleOnload }) => {

  const styles = {
    backgroundImage: `url(${thumbnail})`
  };

  return <div onLoad={handleOnload()} className="pic-container" style={styles} />;
});

export default TileThumbnail;