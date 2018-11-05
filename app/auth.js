document.addEventListener('DOMContentLoaded', () => {

  console.log('DOM Loaded');
  console.log(document.URL.match(/login/))

  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username-input");
  const passwordInput = document.getElementById("password-input");
  const apiRootUrl = `http://localhost:3000`;

  if(!!document.URL.match(/login/)) {
    loginForm.addEventListener('submit', handleLogin);

  } else {
    loginForm.addEventListener('submit', handleSignup);
  }

  usernameInput.focus();
  

  function handleLogin(e) {

    e.preventDefault();
    console.log(`test`);

    console.log(`username:`, usernameInput.value);
    console.log(`pw:`, passwordInput.value);

    const apiUrl = `${apiRootUrl}/login`;
    const options = { 
      method: "POST", 
      headers: { "Content-Type": "application/json", Accept: "application/x-www-form-urlencoded" }, 
      body: JSON.stringify({ 
        username: usernameInput.value, 
        password: passwordInput.value 
      }) 
    };

    fetch(apiUrl, options)
      .then(r => r.json())
      .then(data => {
        
        console.log(data);
        checkCredentials(data)
      })
      // .catch(err => alert(err));
  }

  function handleSignup(e) {

    e.preventDefault();
    console.log(`test`)

    console.log(`username:`, usernameInput.value);
    console.log(`pw:`, passwordInput.value);

    const apiUrl = `${apiRootUrl}/signup`;
    const options = { 
      method: "POST", 
      headers: { "Content-Type": "application/json", Accept: "application/x-www-form-urlencoded" }, 
      body: JSON.stringify({ username: usernameInput.value, password: passwordInput.value }) 
    };

    fetch(apiUrl, options)
      .then(r => r.json())
      .then(data => {

        console.log(data);
        checkCredentials(data);
      })
      // .catch(err => alert(err));
  }

  function checkCredentials(data) {
    if (data.status === 200) {

      usernameInput.value = '';
      document.location.pathname = '/app/index.html'
    }

    passwordInput.value = '';
    usernameInput.focus();

    if (data.status !== 200) {
      alert(data.msg)
    }
  }
})