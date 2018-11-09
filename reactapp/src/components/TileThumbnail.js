import React from 'react';


const TileThumbnail = ({ thumbnail, handleOnload }) => {

  const styles = {
    backgroundImage: `url(${thumbnail})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  };

  return <div onLoad={handleOnload()} className="pic-container" style={styles} />;
};

export default TileThumbnail;