const getBooks = async() => {
    const res = await fetch("api/books")
    const data = await res.json()
    return data
}
const main = document.getElementsByTagName("main")[0]
getBooks().then(data => {
    main.innerHTML = ""
    data.data.forEach(book => {
        main.innerHTML += `
            <div class="book">
                <h3>${book.title}<h3>
                <p>${book.content}</p>
                by <i>${book.author}</i>
            </div>
        `
    });
}).catch(err => {
    main.innerHTML = `
        <div>
            An Error Ocuured
        </div>
    `
})