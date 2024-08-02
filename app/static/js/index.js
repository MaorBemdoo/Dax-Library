const logoutBtn = document.getElementById("logout")
const modal = document.getElementById("modal")
const alertDiv = document.getElementById("alert")
const welcomeP = document.getElementById("welcome")
const addBookBtn = document.getElementsByClassName("add-button")[0]

const activateAndDeactivateAlert = () => {
    alertDiv.classList.add("active")
    modal.style.display = "none"
    setTimeout(() => {
        alertDiv.classList.remove("active")
    }, 5000)
}

modal.addEventListener("click", (e) => {
    modal.style.display = "none"
})

modal.childNodes.forEach(child => {
    child.addEventListener("click", (e) => {
        e.stopPropagation()
    })
})

modal.querySelectorAll(".cancel").forEach(btn => {
    btn.addEventListener("click", (e) => {
        modal.style.display = "none"
    })
})

modal.querySelector(".logout button").addEventListener("click", (e) => {
    fetch("/api/logout").then(res => res.json()).then(data => {
        alertDiv.innerText = data.message
        alertDiv.style.backgroundColor = "green"
        activateAndDeactivateAlert()
        location.assign("/login")
    }).catch(err => {
        console.log(err)
        alertDiv.innerText = err.message
        alertDiv.style.backgroundColor = "red"
        activateAndDeactivateAlert()
    })
})

logoutBtn.addEventListener("click", (e) => {
    modal.style.display = "grid"
    modal.getElementsByClassName("logout")[0].style.display = "grid"
})