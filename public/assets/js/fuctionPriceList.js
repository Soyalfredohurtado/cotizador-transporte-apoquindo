const items = ['Bandera', 'Kilometros', 'Minutos', 'TAG', 'Peajes'];
let inputItem;
console.log('connect')

items.map(item => {
  inputItem = document.querySelector(`#priceList${item}Status`);
  inputItem.addEventListener('change', () => itemChecked(item));
});

function itemChecked(element) {
    let item = document.querySelector(`#priceList${element}`);
    let itemCheck = document.querySelector(`#priceList${element}Status`);
    
    if (itemCheck.value === 'on') {
        item.value = 0;
        item.readOnly = true;
        item.className = 'text-danger text-end';
        itemCheck.value = 'of';
    } else {
        item.value = '';
        item.readOnly = false;
        item.className = 'text-dark text-end';
        itemCheck.value = 'on';
    }
}
