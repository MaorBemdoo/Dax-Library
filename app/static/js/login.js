document.getElementById('sign-in-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const username = document.getElementById('sign-in-username').value;
    const password = document.getElementById('sign-in-password').value;

    if (username === '' || password === '') {
    alert('Please fill in both fields');
    return;
    }

    alert('Sign In successful');
});
  