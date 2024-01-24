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

grocery_list.forEach((item) => {
    let option = document.createElement('option')
    option.innerHTML = item
    grocerylist.appendChild(option)
})

let totalItemsCount = (item)=>{
    return item.length
}

console.log(itemsArray.length)

let itemsPurchasedCount = (item)=>{
    let cart = 0
    item.forEach((i)=>{
        let item_ob = JSON.parse(i)
        if(item_ob.item_status === 'purchased'){
            cart+=1
        }
    })
    return cart
}

let itemsCounter = (totalItemsCount,itemsPurchasedCount)=>{
    totalItems.innerHTML = `Total number of items Purchased ${itemsPurchasedCount} / ${totalItemsCount}`
}

itemsCounter(totalItemsCount(itemsArray),itemsPurchasedCount(itemsArray))

let saveItem = (item)=>{
    console.log(JSON.parse(item))
    let card = document.createElement('div')
    card.classList.add('card')
    
    let itemDetail = document.createElement('div')
    itemDetail.classList.add('item-detail')
    itemDetail.innerHTML = `${JSON.parse(item).item_name} ${JSON.parse(item).quantity}${JSON.parse(item).metrics}`
    card.appendChild(itemDetail)
    
    let statusBox = document.createElement('div')
    statusBox.classList.add('status-box')
    card.appendChild(statusBox)
    section.appendChild(card)
    
    let purchased = document.createElement('div')
    purchased.classList.add('purchased')
    statusBox.appendChild(purchased)

    let notPurchased = document.createElement('div')
    notPurchased.classList.add('not-purchased')
    statusBox.appendChild(notPurchased)

    let edit = document.createElement('div')
    edit.classList.add('edit')
    statusBox.appendChild(edit)

    let deleteItem = document.createElement('div')
    deleteItem.classList.add('delete')
    statusBox.appendChild(deleteItem)


    purchased.addEventListener('click',()=>{
        let itemObject = JSON.parse(item)
        itemObject.item_status = 'purchased'
        let str_itemobj = JSON.stringify(itemObject)
        itemsArray[itemsArray.indexOf(item)] = str_itemobj
        localStorage.setItem('items',JSON.stringify(itemsArray))
        card.style.background = '#8ac926'
        itemsCounter(totalItemsCount(itemsArray),itemsPurchasedCount(itemsArray))

    })

    notPurchased.addEventListener('click',()=>{
        let itemObject = JSON.parse(item)
        itemObject.item_status = 'not purchased'
        let str_itemobj = JSON.stringify(itemObject)
        itemsArray[itemsArray.indexOf(item)] = str_itemobj
        localStorage.setItem('items',JSON.stringify(itemsArray))
        card.style.background = '#FCC72C'
        itemsCounter(totalItemsCount(itemsArray),itemsPurchasedCount(itemsArray))
    })


    let task_object = JSON.parse(item)
    if(task_object.item_status === 'purchased'){
        card.style.background = '#8ac926'
    }
}

itemsArray.forEach(saveItem)


let addItem = () => {
    let item = {
        item_name:itemName.value,
        quantity:quantity.value,
        metrics:metrics.value,
        item_status:'not purchased'
    }
    itemsArray.push(JSON.stringify(item))
    localStorage.setItem('items', JSON.stringify(itemsArray))
    saveItem(JSON.stringify(item))
    itemsCounter(totalItemsCount(itemsArray),itemsPurchasedCount(itemsArray))
    itemName.value = ''
    quantity.value = ''
    metrics.value = ''
}

addItemBtn.addEventListener('click', addItem)