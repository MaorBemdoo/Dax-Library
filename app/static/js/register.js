document.getElementById('sign-up-btn').addEventListener('click', (e) => {
  e.preventDefault();
  const username = document.getElementById('sign-up-username').value;
  const password = document.getElementById('sign-up-password').value;
  const repeatPassword = document.getElementById('repeat-password').value;
  const email = document.getElementById('email-address').value;

  if (username === '' || password === '' || repeatPassword === '' || email === '') {
    alert('Please fill in all fields');
    return;
  }

  if (password !== repeatPassword) {
    alert('Passwords do not match');
    return;
  }
  
  alert('Sign Up successful');
});
  