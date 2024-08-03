const booksContainer = document.getElementById("gridContainer")
const searchBar = document.getElementById("searchBar")

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
                        <p>${book.content}</p>
                        <p>By ${book.author}</p>
                    </div>
                `
            })
        })
        .catch(err => {
            console.log(err)
        })

searchBar.addEventListener("keyup", (e) => {
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
                booksContainer.innerHTML = `<h1>No books for <b>${searchValue}</b> </h1>`
                return
            }

            booksContainer.innerHTML = ""
            
            data.forEach(book => {
                booksContainer.innerHTML += `
                    <div class="grid-item">
                        <h3>${book.title}</h3>
                        <p>${book.content}</p>
                        <p>By ${book.author}</p>
                    </div>
                `
            })
        })
        .catch(err => {
            console.log(err)
        })
})

