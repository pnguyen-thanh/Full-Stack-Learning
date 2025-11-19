export async function fetchProducts(filter = {}) {
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

export function renderProducts(products) {
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