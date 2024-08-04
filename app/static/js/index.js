const logoutBtn = document.getElementsByClassName("logout-button")[0]
const modal = document.getElementById("modal")
const alertDiv = document.getElementById("alert")
const welcomeP = document.getElementById("welcome")
const addBookBtn = document.getElementsByClassName("add-button")[0]
const deleteBookBtn = document.querySelectorAll(".delete-button")
const editBookBtn = document.querySelectorAll(".edit-button")

const currentUser = async() => {
    const res = await fetch("api/getme")
    const data = await res.json()
    return data
}

const getBook = async(bookId) => {
    const res = await fetch(`api/books/${bookId}`)
    const data = await res.json()
    return data
}

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

modal.querySelector("#create button").addEventListener("click", async(e) => {
    const title = modal.querySelector("#title").value
    const content = modal.querySelector("#content").value
    const author = modal.querySelector("#author").value
    const user_id = (await currentUser()).id

    try{
        const res = await fetch("/api/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title, content, author, user_id
            })
        })
    
        const data = await res.json()

        console.log(data)
        if(!res.ok){
            throw new Error(data.message)
        }
    
        activateAndDeactivateAlert(data.message, "success")
        location.reload()
    }catch(err){
        console.log(err)
        activateAndDeactivateAlert(err.message, "error")
    }finally{
        modal.querySelector("#title").value = ""
        modal.querySelector("#content").value = ""
        modal.querySelector("#author").value = ""
    }
})

deleteBookBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        modal.style.display = "grid"
        document.getElementById("delete").style.display = "grid"
        document.getElementById("delete").getElementsByTagName("button")[0].setAttribute("data-book-id", btn.getAttribute("data-book-id"))
    })
})

modal.querySelector("#delete button").addEventListener("click", (e) => {
    const bookId = e.target.getAttribute("data-book-id")
    fetch(`/api/books/${bookId}`, {
        method: "DELETE",
    }).then(res => {
        return res.json()
    }).then(data => {
        activateAndDeactivateAlert(data.message, "success")
        location.reload()
    }).catch(err => {
        console.log(err)
        activateAndDeactivateAlert(err.message, "error")
    })
})

editBookBtn.forEach(btn => {
    btn.addEventListener("click", async(e) => {
        const book = await getBook(btn.getAttribute("data-book-id"))
        modal.querySelector("#edit-title").value = book.title
        modal.querySelector("#edit-content").value = book.content
        modal.querySelector("#edit-author").value = book.author
        modal.style.display = "grid"
        document.getElementById("edit").style.display = "grid"
        modal.querySelector("#edit button").setAttribute("data-book-id", btn.getAttribute("data-book-id"))
    })
})

modal.querySelector("#edit button").addEventListener("click", async(e) => {
    const title = modal.querySelector("#edit-title").value
    const content = modal.querySelector("#edit-content").value
    const author = modal.querySelector("#edit-author").value
    const bookId = modal.querySelector("#edit button").getAttribute("data-book-id")

    try{
        const res = await fetch(`/api/books/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title, content, author
            })
        })
    
        const data = await res.json()

        if(!res.ok){
            throw data.message
        }
    
        activateAndDeactivateAlert(data.message, "success")
        location.reload()
    }catch(err){
        console.log(err)
        activateAndDeactivateAlert(err.message, "error")
    }
})