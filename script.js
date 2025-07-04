let isDelivery = false; // false = Abholen, true = Liefern


function init() {

    loadFromLocalStorage();
    renderDishes();
    renderBasket();
  }


function renderDishes() {
    let contentRef = document.getElementById('dishes-list');
    contentRef.innerHTML = "";
  
    for (let i = 0; i < myDishes.length; i++) {
      contentRef.innerHTML += getDishesTemplate(i);
    }
   
}

  function renderBasket() {
    let contentRef = document.getElementById('basket');
    contentRef.innerHTML = "";

    for (let i = 0; i < basket.length; i++) {
        contentRef.innerHTML += getBasketItemTemplate(i);
    }

    contentRef.innerHTML += getDeliverySwitchTemplate();
    updateBasketSummary();
}

function updateBasketSummary() {
  let subtotal = 0;

  for (let i = 0; i < basket.length; i++) {
      subtotal += basket[i].price * basket[i].amount;
  }

  let deliveryCost = isDelivery ? 5.00 : 0;
  let total = subtotal + deliveryCost;

  document.getElementById('basket-subtotal').innerText = subtotal.toFixed(2).replace('.', ',') + ' €';
  document.getElementById('basket-delivery').innerText = deliveryCost.toFixed(2).replace('.', ',') + ' €';
  document.getElementById('basket-total').innerText = total.toFixed(2).replace('.', ',') + ' €';
}


function toggleDeliveryById() {
  let checkbox = document.getElementById('deliverySwitch');
  isDelivery = checkbox.checked;
  updateBasketSummary();
}




function addToBasket(index) {
    let dish = myDishes[index];
    let basketItem = basket.find(item => item.name === dish.name);
    if (basketItem) {
        basketItem.amount++;
    } else {
        basket.push({ ...dish, amount: 1 });
    }
  renderBasket();
  saveToLocalStorage();
}

function toggleBasket() {
    let basketSidebar = document.getElementById("dishes-basket");
  
    if (basketSidebar.classList.contains("open")) {
      closeBasket(); // schon offen → schließe
    } else {
      openBasket();  // noch geschlossen → öffne
    }
  }

function openBasket() {
  document.getElementById("dishes-basket").classList.add("open");
  document.getElementById("basket-overlay").classList.add("visible");
}
  
function closeBasket() {
  document.getElementById("dishes-basket").classList.remove("open");
  document.getElementById("basket-overlay").classList.remove("visible");
}
  

function increaseAmount(index) {
    basket[index].amount++; // plus einem Gericht
    renderBasket();
    saveToLocalStorage();
  }
  
function decreaseAmount(index) {
  if (basket[index].amount > 1) {
    basket[index].amount--; // minus einem Gericht
  }
  renderBasket();
  saveToLocalStorage();
}

function removeFromBasket(index) {
  basket.splice(index, 1); // entfernt das Gericht
  renderBasket();
  saveToLocalStorage();
}

function orderButton() {
  basket = [];

  let confirmation = document.getElementById('confirmation-message')
  confirmation.innerHTML = `<p>Sie haben eine Testbestellung aufgegeben!</p>`
  confirmation.style.display = "block";

renderBasket();
saveToLocalStorage();
}


function saveToLocalStorage() {
    localStorage.setItem('basketData', JSON.stringify(basket));
}
  
function loadFromLocalStorage() {
  let storedBasket = JSON.parse(localStorage.getItem('basketData'));

  if (storedBasket) {
      basket = storedBasket;
  } else {
      basket = [];
  }
}