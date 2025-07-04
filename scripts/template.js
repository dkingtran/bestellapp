function getDishesTemplate(index) {
    let dishGroup = myDishes[index];
    
    return `   
        <div class="dish-group">
            <h3 class="dish-name">${dishGroup.name}</h3>
            <span class="dish-description">${dishGroup.description}</span>
            <span class="dish-price">${dishGroup.price.toFixed(2)} €</span>
            <button onclick="addToBasket(${index})">
            <img src="./assets/icon/icons8-plus-24.png" alt="add to basket">
            </button>
      </div>`;
}

function getBasketItemTemplate(index) {
    let item = basket[index];
    return `
      <div class="basket-item">
        <span class="item-name">${item.name}</span>
        <div class="item-controls">
          <button class="plus-minus" onclick="decreaseAmount(${index})"><img src="./assets/icon/icons8-minus-24.png" alt="minus" /></button>
          <span class="item-amount">${item.amount}</span>
          <button class="plus-minus" onclick="increaseAmount(${index})"><img src="./assets/icon/icons8-plus-24.png" alt="plus" /></button>
          <span class="item-total">${(item.price * item.amount).toFixed(2)} €</span>
          <button class="remove-btn" onclick="removeFromBasket(${index})"><img src="./assets/icon/icons8-trash-can-48.png" alt=""></button>
        </div>
      </div>
    `;
  }
  


  function getDeliverySwitchTemplate() {
    let switchBar = isDelivery ? 'checked' : '';
    return `
        <div class="delivery-switch">
            <span>Abholen</span>
            <label class="switch">
              <input type="checkbox" id="deliverySwitch" onchange="toggleDeliveryById()" ${switchBar}>
              <span class="slider round"></span>
            </label>
            <span>Liefern</span>
        </div>

        <div class="basket-summary">
            <div class="summary-row">
                <span>Zwischensumme</span>
                <span id="basket-subtotal">0,00 €</span>
            </div>
            <div class="summary-row">
                <span>Lieferkosten</span>
                <span id="basket-delivery">0,00 €</span>
            </div>
            
            <div class="summary-row total">
                <span>Gesamt</span>
                <span id="basket-total">0,00 €</span>
            </div>
            <div class="order-button">
            <button class="order-btn-button" onclick="orderButton()">Bestellen</button>
            </div>
        </div>
    `;
}


