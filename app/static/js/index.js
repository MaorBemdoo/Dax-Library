const logoutBtn = document.getElementsByClassName("logout-button")[0]
const modal = document.getElementById("modal")
const alertDiv = document.getElementById("alert")
const welcomeP = document.getElementById("welcome")
const addBookBtn = document.getElementsByClassName("add-button")[0]

const activateAndDeactivateAlert = (text, type) => {
    alertDiv.innerText = text
    alertDiv.style.backgroundColor = type == "success" ? "green" : type == "error" ? "red" : "blue"
    alertDiv.classList.add("active")
    modal.style.display = "none"
    setTimeout(() => {
        alertDiv.classList.remove("active")
    }, 5000)
}

modal.addEventListener("click", (e) => {
    modal.style.display = "none"
    modal.children.logout.style.display = "none"
    modal.children.delete.style.display = "none"
    modal.children.create.style.display = "none"
    modal.children.edit.style.display = "none"
})

modal.childNodes.forEach(child => {
    child.addEventListener("click", (e) => {
        e.stopPropagation()
    })
})

modal.querySelectorAll(".cancel").forEach(btn => {
    btn.addEventListener("click", (e) => {
        modal.style.display = "none"
        modal.children.logout.style.display = "none"
        modal.children.delete.style.display = "none"
        modal.children.create.style.display = "none"
        modal.children.edit.style.display = "none"
    })
})

modal.querySelector("#logout button").addEventListener("click", (e) => {
    fetch("/api/logout").then(res => {
        return res.json()
    }).then(data => {
        activateAndDeactivateAlert(data.message, "success")
        location.assign("/login")
    }).catch(err => {
        console.log(err)
        activateAndDeactivateAlert(err.message, "error")
    })
})

logoutBtn.addEventListener("click", (e) => {
    modal.style.display = "grid"
    document.getElementById("logout").style.display = "grid"
})

addBookBtn.addEventListener("click", (e) => {
    modal.style.display = "grid"
    document.getElementById("create").style.display = "grid"
})