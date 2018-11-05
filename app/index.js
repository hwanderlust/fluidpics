document.addEventListener('DOMContentLoaded', () => {
  console.log(`DOM Loaded`);

  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const picturesContainer = document.getElementById('pictures-container');
  const logoutBtn = document.getElementById('logout-btn')
  const apiRootUrl = `http://localhost:3000`;
  

  searchForm.addEventListener('submit', handleSearchSubmit);
  logoutBtn.addEventListener('click', handleLogout);

  
  function handleLogout(e) {
    e.preventDefault();

    fetch(`${apiRootUrl}/logout`, { method: 'DELETE' })
      .then(r => r.json())
      .then(r => {
        alert(r.msg)
        document.location.assign('/app/login.html')
      })
  }
  
  function handleSearchSubmit(e) {
    
    e.preventDefault();
    console.log(`test`, searchInput.value);

    const apiUrl = `${apiRootUrl}/search/${searchInput.value}`;
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
