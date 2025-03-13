import { menuArray } from './data.js'

const menuItemsContainer = document.getElementById('menu-items-container')
const orderItemsContainer = document.getElementById('order-items-container')
let orderItems = []

function handleRemoveItemBtnClick(e) {
    const removeOrderItemIdx = parseInt(e.target.dataset.removeBtnItemIdx)
    orderItems = orderItems.filter((item, idx) => idx !== removeOrderItemIdx)
    renderOrderItems()
}

function handleAddItemBtnClick(e) {
    const menuItemId = parseInt(e.target.dataset.menuItemId)
    const menuItem = menuArray.filter(currentMenuItem => currentMenuItem.id === menuItemId)[0]
    orderItems.push(menuItem)
    renderOrderItems()
}

function handleCompleteOrderBtn(e) {
    e.preventDefault()

    const modal = document.getElementById('modal')
    modal.style.display = 'block'
    const closeModalBtn = document.getElementById('close-modal-btn')
    closeModalBtn.addEventListener('click', handlePaymentFormClose)

    const orderPaymentForm = document.getElementById('order-payment-form')
    orderPaymentForm.onsubmit = handlePaymentFormSubmit

}

function renderMenuItems() {
    const menuItemsHtml = menuArray.map( ({id, name, ingredients, price, emoji}) => `
        <div class="menu-item">
            <p class="menu-item-emoji">${emoji}</p>
            <div class="menu-item-details">
                <h3 class="item-name">${name}</h3>
                <p class="item-ingredients">${ingredients}</p>
                <p class="item-price">$${price}</p>
            </div>
            <button 
                class="add-menu-item-btn align-right"
                data-menu-item-id="${id}"
            >+</button>
        </div>
    `).join('')

    menuItemsContainer.innerHTML = menuItemsHtml

    const menuItemBtns = [...document.getElementsByClassName('add-menu-item-btn')]
    menuItemBtns.forEach(btn => btn.onclick = handleAddItemBtnClick)
    
}

function handlePaymentFormClose(e) {
    console.log("Test")
    e.preventDefault()

    const orderPaymentForm = document.getElementById('order-payment-form')
    orderPaymentForm.reset()

    const modal = document.getElementById('modal')
    modal.style.display ='none'
}

function handlePaymentFormSubmit(e) {
    e.preventDefault()

    const modal = document.getElementById('modal')
    modal.style.display = "none"

    const name = document.getElementById('name').value

    const orderSummaryContainer = document.getElementById('order-summary-container')
    orderSummaryContainer.innerHTML = `
        <h4 class="order-success-text">Thanks ${name}! Your order is on its way</h4>
    `
}

function renderOrderItems() {


    const orderItemsHtml = orderItems.map( ({id, name, price}, idx) => `
        <div class="order-item-container">
            <h3 class="item-name">${name}</h3>
            <button class="remove-order-item-btn" data-remove-btn-item-idx=${idx}>remove</button>
            <p class="item-price align-right">$${price}</p>
        </div>
    `).join('')
    orderItemsContainer.innerHTML = orderItemsHtml
    const removeItemBtns = [...document.getElementsByClassName('remove-order-item-btn')]
    removeItemBtns.forEach(btn => btn.onclick = handleRemoveItemBtnClick)

    const orderTotalPriceText = document.getElementById('total-order-price')
    orderTotalPriceText.textContent = `$${orderItems.reduce((accum, curItem) => accum + curItem.price, 0)}`

    const completeOrderBtn = document.getElementById('complete-order-btn')
    completeOrderBtn.style.display = orderItems.length ? 'block' : 'none'
    completeOrderBtn.onclick = handleCompleteOrderBtn
}

renderMenuItems()
renderOrderItems()



