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
    })
    .catch(err => {
        console.log(err)
        location.replace("/404")
    })