document.getElementById('searchBar').addEventListener('keyup', (e) => {
    const searchValue = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.grid-item');

    items.forEach(function(item) {
        const text = item.textContent.toLowerCase();
        if (text.includes(searchValue)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
            const getBooks = async() => {
                const res = await fetch(`api/books?q=${searchValue}`)
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
        }
    });
});
