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

const micBtn = document.getElementById('micBtn');
micBtn.classList.add('micBtn-off')
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.lang = 'en-US';

micBtn.addEventListener('click', () => {
    micBtn.classList.remove('micBtn-off')
  micBtn.classList.add('micBtn-on')
  recognition.start();
});

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  itemName.value = transcript;
};

recognition.onend = () => {
    micBtn.classList.remove('micBtn-on')
    micBtn.classList.add('micBtn-off')

};

recognition.onerror = (event) => {
  console.error('Speech recognition error:', event.error);
  micBtn.classList.add('micBtn-off')

};

grocery_list.forEach((item) => {
    let option = document.createElement('option')
    option.innerHTML = item
    grocerylist.appendChild(option)
})

let totalItemsCount = (item) => {
    return item.length
}

console.log(itemsArray.length)

let itemsPurchasedCount = (item) => {
    let cart = 0
    item.forEach((i) => {
        let item_ob = i
        if (item_ob.item_status === 'purchased') {
            cart += 1
        }
    })
    return cart
}

let itemsCounter = (totalItemsCount, itemsPurchasedCount) => {
    totalItems.innerHTML = `Total number of items Purchased ${itemsPurchasedCount} / ${totalItemsCount}`
}

let updateCounts = () => {
    itemsCounter(totalItemsCount(itemsArray), itemsPurchasedCount(itemsArray));
};

let saveItem = (item) => {
    console.log(item)
    let card = document.createElement('div')
    card.classList.add('card')

    let itemDetail = document.createElement('div')
    itemDetail.classList.add('item-detail')
    itemDetail.innerHTML = `${item.item_name} ${item.quantity}${item.metrics}`
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

    let deleteItem = document.createElement('div')
    deleteItem.classList.add('delete')
    statusBox.appendChild(deleteItem)


    purchased.addEventListener('click', () => {
        item.item_status = 'purchased';
        updateItemInArray(item);
        localStorage.setItem('items', JSON.stringify(itemsArray))
        card.style.background = '#8ac926'
        updateCounts();
    })

    notPurchased.addEventListener('click', () => {
        item.item_status = 'not purchased'
        updateItemInArray(item);
        localStorage.setItem('items', JSON.stringify(itemsArray))
        card.style.background = '#FCC72C'
        updateCounts();
    })


    deleteItem.addEventListener('click', () => {
        let itemConfirmation = confirm('Do you want to delete this Item?')
        if(itemConfirmation){
            section.removeChild(card)
            let res = itemsArray.indexOf(item)
            if (res > -1) {
                itemsArray.splice(res, 1);  // Remove the element
            }
            localStorage.setItem('items', JSON.stringify(itemsArray))
            location.reload()
        }
    })


    let task_object = item
    if (task_object.item_status === 'not purchased') {
        card.style.background = '#FCC72C'
        updateCounts();
    } else {
        card.style.background = '#8ac926'
        updateCounts();
    }
}

let updateItemInArray = (updatedItem) => {
    let index = itemsArray.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
        itemsArray[index] = updatedItem;
    }
};


itemsArray.forEach(saveItem)

let addItem = () => {
    if (itemName.value === '') {
        alert('Item Name should not be Empty!!')
    }else  if(quantity.value === ''){
        alert('Quantity Should not be empty')
    }else if(metrics.value === ''){
        alert('Weight of an Item Should not be empty')
    }else{
        let item = {
            id: Date.now(),
            item_name: itemName.value,
            quantity: quantity.value,
            metrics: metrics.value,
            item_status: 'not purchased'
        }
        itemsArray.push(item)
        localStorage.setItem('items', JSON.stringify(itemsArray))
        saveItem(item)
        updateCounts();
        itemName.value = ''
        quantity.value = ''
        metrics.value = ''
    }
}

let deleteAll = () => {
    if (itemsArray.length === 0) {
        alert('No Tasks to Delete')
    } else {
        let confirmation = confirm('Do you want do Delete all Items?')
        if(confirmation){
            localStorage.clear()
            itemsArray.length = 0;
            while (section.firstChild) {
                section.removeChild(section.firstChild);
            }
            location.reload()
        }
    }
}



deleteAllBtn.addEventListener('click', deleteAll)
addItemBtn.addEventListener('click', addItem)