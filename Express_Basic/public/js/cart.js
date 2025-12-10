import { logout } from "./logout.js"
import { checkAuth, renderGreeting, showHideMenuItems } from "./authUI.js"
import { removeAllListeners } from "process"


const dom = {
    checkOutBtn: document.getElementById('checkout-btn'),
    userMessage: document.getElementById('user-message'),
    cartList: document.getElementById('cart-list'),
    cartTotal: document.getElementById('cart-total')
}

document.getElementById('logout-btn').addEventListener('click', logout)

dom.cartList.addEventListener('click', e => {
    // console.log(e.target)
    if (e.target.matches('.remove-btn')) {
        removeItem(e.target.dataset.id, dom)
    }
})


dom.checkOutBtn.addEventListener('click', () => {
    removeAllListeners(dom)
    dom.userMessage.textContent = 'Your order has been sent for processing'
    dom.checkOutBtn.classList.add('visually-hidden')
    dom.cartTotal.classList.add('visually-hidden')
})


async function init() {

}