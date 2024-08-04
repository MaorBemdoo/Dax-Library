const logoutBtn = document.getElementById("logout")
const modal = document.getElementById("modal")
const alertDiv = document.getElementById("alert")
const title = document.getElementById("title")
const content = document.getElementById("content")
const author = document.getElementById("author")
const user = document.getElementById("user")

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
    modal.getElementsByClassName("logout")[0].style.display = "grid"
})

fetch(`/api/books/${location.pathname.slice(7)}`)
    .then(res => {
        if(!res.ok){
            throw res.json()
        }
        return res.json()
    })
    .then(data => {
        console.log(data)
        document.head.getElementsByTagName("title")[0].innerHTML = `${data.title} - Dax`
        title.innerText = data.title
        content.innerText = data.content
        author.innerText = "Written by: " + data.author
    })
    .catch(err => {
        console.log(err)
        location.replace("/404")
    })