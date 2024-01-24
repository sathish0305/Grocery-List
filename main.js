let itemName = document.getElementById('itemName')
let metrics = document.getElementById('metrics')
let quantity = document.getElementById('quantity')
let section = document.getElementsByTagName('section')[0]
let addItemBtn = document.getElementById('addItemBtn')
let totalItems = document.getElementById('info')
let deleteAllBtn = document.getElementById('deleteAllBtn')
let itemsArray = (localStorage.getItem('items')) ? JSON.parse(localStorage.getItem('items')) : []
let grocerylist = document.getElementById('grocerylist')
import grocery_list from "./itemsList"

let total_items = (purchased_item, total_item) => {
    totalItems.innerHTML = `Total Numbers of items purchased: ${purchased_item} / ${total_item}`
}

total_items(1, itemsArray.length)

grocery_list.forEach((item) => {
    let option = document.createElement('option')
    option.innerHTML = item
    grocerylist.appendChild(option)
})

let itemCard = (itemName, quantity, metrics) => {
    return `<div class='card'>
        <div class='item-detail'>
            ${itemName} ${quantity}${metrics}
        </div>
        <div class='status-box'>
            <div id='purchased' class="purchased"></div>
            <div id='not-purchased' class="not-purchased"></div>
            <div id='edit' class="edit"></div>
            <div id='delete' class="delete"></div>
        </div>
    </div>`
}

itemsArray.forEach((item) => {
    let template = document.createElement('template');
    template.innerHTML = itemCard(item.item_name, item.quantity, item.metrics);
    section.appendChild(template.content)
})

let purchased = document.getElementById('purchased')
let notPurchased = document.getElementById('not-purchased')
let edit = document.getElementById('edit')
let deleteItem = document.getElementById('delete')

let addItem = () => {
    let item = {
        item_name: itemName.value,
        quantity: quantity.value,
        metrics: metrics.value
    }
    itemsArray.push(item)
    localStorage.setItem('items', JSON.stringify(itemsArray))
    let template = document.createElement('template');
    template.innerHTML = itemCard(itemName.value, quantity.value, metrics.value);
    section.appendChild(template.content)
    itemName.value = ''
    quantity.value = ''
    metrics.value = ''
    location.reload()
}

addItemBtn.addEventListener('click', addItem)