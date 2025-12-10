export async function applySearchFilter() {
    const search = document.getElementById('search-input').value.trim()
    const filters = {}
    if (search) filters.search = search

    // console.log(filters)
    // console.log(search)

    const products = await fetchProducts(filters)
    renderProducts(products)
}

export async function fetchGenres() {
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