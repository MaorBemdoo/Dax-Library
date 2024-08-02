const logoutBtn = document.getElementById("logout")
const modal = document.getElementById("modal")
const welcomeP = document.getElementById("welcome")

modal.addEventListener("click", (e) => {
    modal.style.display = "none"
    modal.childNodes.forEach(child => {
        child.addEventListener("click", (e) => {
            e.stopPropagation()
        })
    })
})

logoutBtn.addEventListener("click", (e) => {
    modal.style.display = "grid"
    modal.getElementsByClassName("logout")[0].style.display = "grid"
})