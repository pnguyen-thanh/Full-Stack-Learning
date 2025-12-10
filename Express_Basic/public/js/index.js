import { fetchProducts, renderProducts } from "./productUI.js"
import { fetchGenres, applySearchFilter } from "./productService.js"
import { checkAuth, renderGreeting, showHideMenuItems } from "./authUI.js"
import { logout } from "./logout.js"


document.getElementById('logout-btn').addEventListener('click', logout)

async function init() {
    fetchGenres()
    const products = await fetchProducts()
    const name = await checkAuth()
    renderProducts(products)
    renderGreeting(name)
    showHideMenuItems(name)
}

init()

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


