const booksContainer = document.getElementById("gridContainer")
const searchBar = document.getElementById("searchBar")
const logoutBtn = document.getElementById("logout")
const modal = document.getElementById("modal")
const alertDiv = document.getElementById("alert")

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

booksContainer.innerHTML = `
    <div class="loading-placeholder"></div>
    <div class="loading-placeholder"></div>
    <div class="loading-placeholder"></div>
    <div class="loading-placeholder"></div>
    <div class="loading-placeholder"></div>
    <div class="loading-placeholder"></div>
    <div class="loading-placeholder"></div>
    <div class="loading-placeholder"></div>
`

fetch(`/api/books`)
        .then(res => res.json())
        .then(({data}) => {
            booksContainer.innerHTML = ""
            if(data.length == 0){
                booksContainer.innerHTML = "<h1>No books yet</h1>"
                return
            }
    
            data.forEach(book => {
                booksContainer.innerHTML += `
                    <div class="grid-item">
                        <h3>${book.title}</h3>
                        <p>${book.content.slice(0, 20)}...</p>
                        <p>By ${book.author}</p>
                    </div>
                `
            })
        })
        .catch(err => {
            console.log(err)
        })

searchBar.addEventListener("input", (e) => {
    const searchValue = searchBar.value
    booksContainer.innerHTML = `
        <div class="loading-placeholder"></div>
        <div class="loading-placeholder"></div>
        <div class="loading-placeholder"></div>
        <div class="loading-placeholder"></div>
        <div class="loading-placeholder"></div>
        <div class="loading-placeholder"></div>
        <div class="loading-placeholder"></div>
        <div class="loading-placeholder"></div>
    `
    fetch(`/api/books?q=${searchValue}`)
        .then(res => res.json())
        .then(({data}) => {
            if(data.length == 0){
                booksContainer.innerHTML = `<h1 style="grid-column: span 3;text-align: center;">No books for <b>"${searchValue}"</b></h1>`
                return
            }

            booksContainer.innerHTML = ""
            
            data.forEach(book => {
                booksContainer.innerHTML += `
                    <div class="grid-item">
                        <h3>${book.title}</h3>
                        <p>${book.content.slice(0, 20).slice(0, 20)}...</p>
                        <p>By ${book.author}</p>
                    </div>
                `
            })
        })
        .catch(err => {
            console.log(err)
        })
})
