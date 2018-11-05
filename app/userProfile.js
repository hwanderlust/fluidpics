document.addEventListener('DOMContentLoaded', () => {
  
  console.log(`DOM Loaded`);
  const apiRootUrl = `http://localhost:3000`
  const userProfileForm = document.getElementById('user-profile-form');
  const usernameInput = document.getElementById('username-input');
  const passwordInput = document.getElementById('password-input');
  const passwordConfirmationInput = document.getElementById('password-confirmation-input');
  const deleteBtn = document.getElementById('delete-btn');
  let prevUsername, userId;

  loadUserInfo();
  passwordInput.focus();


  userProfileForm.addEventListener('submit', handleFormSubmit);
  deleteBtn.addEventListener("click", handleAccountDeletion);


  function loadUserInfo() {
    fetch(`${apiRootUrl}/app/edit-user`)
      .then(r => r.json())
      .then(data => {
        userId = data["_id"];
        prevUsername = data.username;
        usernameInput.value = prevUsername;
      });
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (prevUsername === usernameInput.value && passwordInput.value === '' && passwordConfirmationInput.value === '') {
      return alert('There seem to be no changes made.')
    }

    if (passwordInput.value !== passwordConfirmationInput.value) {
      return alert(`Looks like you have a typo in your passwords`)
    }

    if (usernameInput.value && passwordInput.value === passwordConfirmationInput.value) {

      const options = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userId,
          username: usernameInput.value,
          password: passwordInput.value
        })
      }

      fetch(`${apiRootUrl}/users/${userId}`, options)
        .then(r => r.json())
        .then(r => {

          alert(r.msg)

          if (r.status === 200) {
            document.location.assign('/app')
            return
          }

          passwordInput.focus();
        })
    }
  }

  function handleAccountDeletion(e) {
    e.preventDefault();

    fetch(`${apiRootUrl}/users/delete-user`, { method: 'DELETE' })
      .then(r => r.json())
      .then(r => {
        alert(r.msg)
        document.location.assign('/app/signup.html')
      })
  }
  
})