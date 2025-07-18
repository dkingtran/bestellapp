let isDelivery = false; 


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
        basket.push({ 
          name: dish.name,
          price: dish.price,
          description: dish.description,
          amount: 1
        });
    }
  renderBasket();
  saveToLocalStorage();
}

function toggleBasket() {
    let basketSidebar = document.getElementById("dishes-basket");
  
    if (basketSidebar.classList.contains("open")) {
      closeBasket(); 
    } else {
      openBasket();  
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
    basket[index].amount++;
    renderBasket();
    saveToLocalStorage();
  }
  
function decreaseAmount(index) {
  if (basket[index].amount > 1) {
    basket[index].amount--; 
  }
  renderBasket();
  saveToLocalStorage();
}

function removeFromBasket(index) {
  basket.splice(index, 1); 
  renderBasket();
  saveToLocalStorage();
}

function orderButton() {
  basket = [];

  let confirmation = document.getElementById('confirmation-message')
  confirmation.innerHTML = `<p>Sie haben eine Testbestellung aufgegeben!</p>`
  confirmation.style.display = "block";

  setTimeout(() => {
    confirmation.style.display = "none";
  }, 3000);


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