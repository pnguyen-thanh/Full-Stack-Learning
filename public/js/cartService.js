export function addBtnListeners() {
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', async e => {
            const albumId = e.currentTarget.dataset.albumId

            try {
                const res = await fetch('/api/cart/add', {
                    method: 'POST',
                    headers: { 'Content-Type' : 'application/json'},
                    credentials: 'include',
                    body: JSON.stringify({ productId: albumId})
                })

                if (!res.ok) {
                    return window.location.href = '/login.html'
                }



            } catch (err) {
                console.error('Error adding to cart: ', err)
            }
        })
    })
}

export async function updateCartIcon() {
    try {
        const res = await fetch('/api/cart/cart-count')
        const obj = await res.json()
        const totalItems = obj.totalItems

        
    } catch (err) {

    }
}

