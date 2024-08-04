const alertDiv = document.getElementById("alert")

const activateAndDeactivateAlert = (text, type) => {
    alertDiv.innerText = text
    alertDiv.style.backgroundColor = type == "success" ? "green" : type == "error" ? "red" : "blue"
    alertDiv.classList.add("active")
    setTimeout(() => {
        alertDiv.classList.remove("active")
    }, 5000)
}

document.getElementById('sign-up-btn').addEventListener('click', async(e) => {
  e.preventDefault();
  const full_name = document.getElementById('sign-up-fullname').value;
  const username = document.getElementById('sign-up-username').value;
  const password = document.getElementById('sign-up-password').value;
  const repeatPassword = document.getElementById('repeat-password').value;

  if (username === '' || password === '' || repeatPassword === '' || full_name === '') {
    activateAndDeactivateAlert("Please fill in required fields", "error")
    return;
  }

  if(password <= 6){
    activateAndDeactivateAlert("Passwords must be more than 6 characters", "error")
    return;
  }

  if (password !== repeatPassword) {
    activateAndDeactivateAlert("Passwords do not match", "error")
    return;
  }

  try{
    const res1 = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        full_name, username, password
      })
    })

    const data1 = await res1.json()

    if(!res1.ok){
        throw data1.message
    }

    const res2 = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username, password
      })
    })

    const data2 = await res2.json()

    if(!res2.ok){
        throw data2.message
    }

    location.assign("/")
    
  }catch(err){
      console.log(err)
      activateAndDeactivateAlert(err, "error")
  }
});
