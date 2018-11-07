import React, { memo } from 'react';

const TilePic = memo(({ picture }) => {

  const styles = { 
    backgroundImage: `url(${picture})`, 
    backgroundSize: "cover", 
    backgroundRepeat: "no-repeat", 
    backgroundPosition: "center" 
  };

  return <div className="pic-container" style={styles} />;
});

export default TilePic;