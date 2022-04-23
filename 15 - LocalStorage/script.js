
const pageForm = document.querySelector('.add-items');
const input = document.querySelector('input[type="text"]')
const itemsList = document.querySelector('.plates');
const tapasStorage = window.localStorage;
let items = [];

const tapasStored = JSON.parse(tapasStorage.getItem('items'));
console.log(tapasStored);

if (tapasStored) {
    removeLoading();
    createList(tapasStored);
}

pageForm.addEventListener('submit', addItem);
itemsList.addEventListener('click', e => {
    toggleItemChecked(e);
})

function addItem(e) {
    e.preventDefault();

    const item = {
        text: input.value,
        done: false
    };
    items.push(item);
    input.value = '';
    updateStorage();
    if (items.legnth === 1) {
        removeLoading();
    }
    createListItem(item, items.length - 1);
    console.log(items)
}

function createList(data) {
    console.log('should create LIST with', data);
    data.forEach((tapa, i) => {
        items.push(tapa);
        createListItem(tapa, i);
    })
}

function createListItem(tapa, index) {
    console.log(tapa)
    const li = document.createElement('li');
    const template = `
        <li>
        <input type="checkbox" data-index=${index} id="item${index}" ${tapa.done ? 'checked' : ''} />
        <label for="item${index}">${tapa.text}</label>
        </li>
    `;

    li.innerHTML = template;
    itemsList.appendChild(li);
}

function removeLoading() {
    itemsList.innerHTML = '';
}

function toggleItemChecked(event) {
    const index = event.target.dataset.index;
    if (index) {
        console.log(event.target, event.target.checked, index);
        const isChecked = event.target.checked;
        items[index].done = isChecked;
        console.log(items);
        updateStorage();
    }
}

function updateStorage() {
    tapasStorage.setItem('items', JSON.stringify(items));
}

//TODO
// 1. boton de clearList
// 2. Boton de check all /uncheck all