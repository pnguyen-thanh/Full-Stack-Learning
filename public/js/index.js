async function applySearchFilter() {
    const search = document.getElementById('search-input').value.trim()
    const filters = {}
    if (search) filters.search = search

    // console.log(filters)
    // console.log(search)

    const products = await fetchProducts(filters)
    renderProducts(products)
}

document.getElementById('search-input').addEventListener('input', (e) => {
    e.preventDefault()
    applySearchFilter()
})

document.getElementById('search-input').addEventListener('submit', (e) => {
    e.preventDefault()
})

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  applySearchFilter() // your function to run the search
})

document.getElementById('genre-select').addEventListener('click', async(e) => {
    const genre = e.target.value
    // console.log(genre)
    const products = await fetchProducts(genre? {genre} : {} )

    // console.log(products)
    renderProducts(products)
})

async function fetchProducts(filter = {}) {
    const queryParams = new URLSearchParams(filter)
    try {
        const res = await fetch(`/api/products?${queryParams}`)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()
        // console.log('Fetched products:', data)
        return data
    } catch (err) {
        console.error('Error fetching products:', err)
        return []
    }
}

function renderProducts(products) {
    const albumsContainer = document.getElementById('products-container')
    const cards = products.map(album => {
        return `
        <div class="product-card">
            <img src="/images/${album.image}" alt="${album.title}">
            <h2>${album.title}</h2>
            <h3>${album.artist}</h3>
            <p>$${album.price}</p>
            <button class="add-btn">Add to Cart</button>
            <p class="genre-label">${album.genre}</p>
        </div>
        `
    }).join('')

    albumsContainer.innerHTML = cards
}

async function fetchGenres() {
    const genDropDown = document.getElementById('genre-select')
    try {
        const res = await fetch(`/api/products/genres`)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const genres = await res.json()
        // console.log('Fetched genres:', genres)
        if (genres) {
            genDropDown.innerHTML += genres.map(genre => `<option>${genre}</option>`).join('')
        }
        
    } catch (err) {
        console.error('Error fetching genres:', err)
        return []
    }
}

async function init() {
    fetchGenres()
    const products = await fetchProducts()
    renderProducts(products)
}

init()
