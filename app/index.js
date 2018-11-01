document.addEventListener('DOMContentLoaded', () => {
  console.log(`DOM Loaded`);

  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const picturesContainer = document.getElementById('pictures-container');
  
  searchForm.addEventListener('submit', handleSearchSubmit);
  
  function handleSearchSubmit(e) {
    
    e.preventDefault();
    console.log(`test`, searchInput.value);

    const apiUrl = `http://localhost:3000/search/${searchInput.value}`;
    const options = {
      method: 'GET',
    };

    fetch(apiUrl, options)
      .then(r => r.json())
      .then(data => {
        // console.log(data);
        data.forEach((pic, idx) => {
          
          const picWrapper = document.createElement('div');
          const picImg = document.createElement('img');
          
          picImg.src = pic;
          picImg.alt = `${searchInput.value} ${idx}`;
          picImg.className = ``;

          picWrapper.className = ``;
          picWrapper.appendChild(picImg);

          picturesContainer.appendChild(picWrapper);
        });
      });

    searchInput.value = ``;
  };

});
