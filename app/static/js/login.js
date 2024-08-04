const alertDiv = document.getElementById("alert")

const activateAndDeactivateAlert = (text, type) => {
    alertDiv.innerText = text
    alertDiv.style.backgroundColor = type == "success" ? "green" : type == "error" ? "red" : "blue"
    alertDiv.classList.add("active")
    setTimeout(() => {
        alertDiv.classList.remove("active")
    }, 5000)
}

document.getElementById('sign-in-btn').addEventListener('click', async(e) => {
    e.preventDefault();
    const username = document.getElementById('sign-in-username').value;
    const password = document.getElementById('sign-in-password').value;

    if (username === '' || password === '') {
        activateAndDeactivateAlert('Please fill in both fields', "error");
        return;
    }

    try{
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username, password
            })
        })
    
        const data = await res.json()

        if(!res.ok){
            throw data.message
        }
    
        location.assign("/")
    }catch(err){
        console.log(err)
        activateAndDeactivateAlert(err, "error")
    }
});
  