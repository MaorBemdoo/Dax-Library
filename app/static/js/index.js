const logoutBtn = document.getElementById("logout")
const modal = document.getElementById("modal")
const welcomeP = document.getElementById("welcome")
const addBookBtn = document.getElementsByClassName("add-button")[0]

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
        
    }).catch(err => {
        console.log(err.message)
    })
})

logoutBtn.addEventListener("click", (e) => {
    modal.style.display = "grid"
    modal.getElementsByClassName("logout")[0].style.display = "grid"
})