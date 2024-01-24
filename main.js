let itemName = document.getElementById('itemName')
let metrics = document.getElementById('metrics')
let quantity = document.getElementById('quantity')
let section = document.getElementsByTagName('section')[0]
let addItemBtn = document.getElementById('addItemBtn')
let deleteAllBtn = document.getElementById('deleteAllBtn')
let itemsArray = (localStorage.getItem('items'))? JSON.parse(localStorage.getItem('items')) : []
let grocerylist = document.getElementById('grocerylist')
import grocery_list from "./itemsList"

console.log(itemsArray)
grocery_list.forEach((item) => {
    let option = document.createElement('option')
    option.innerHTML = item
    grocerylist.appendChild(option)
})

let itemCard = (itemName,quantity,metrics)=>{
    return `<div class='card'>
        <div class='item-detail'>
            ${itemName} ${quantity}${metrics}
        </div>
        <div class='status-box'>
        </div>
    </div>`
}
  

let addItem = ()=>{
    let item = {
        item_name : itemName.value,
        quantity : quantity.value,
        metrics : metrics.value
    }
    itemsArray.push(item)
    localStorage.setItem('items',JSON.stringify(itemsArray))
    let template = document.createElement('template');
    template.innerHTML = itemCard(itemName.value,quantity.value,metrics.value);
    section.appendChild(template.content)
    itemName.value = ''
    quantity.value = ''
    metrics.value = ''
    console.log(localStorage.getItem('items'))
}

addItemBtn.addEventListener('click',addItem)