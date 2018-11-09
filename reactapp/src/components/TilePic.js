import React, { memo } from 'react';


const TilePic = memo(({ picture }) => {

  const styles = { 
    backgroundImage: `url(${picture})`
  };
  
  return <div className="pic-container" style={styles} />;
});

export default TilePic;