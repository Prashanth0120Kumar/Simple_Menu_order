document.getElementById("add").addEventListener('click', function(event) {
  event.preventDefault()
  var orderFormContainer = document.getElementById('orderDetails');
  orderFormContainer.innerHTML = `
    <form class="orderForm" style="padding: 20px; margin-top: 20px;">
      <h2>Order Details</h2>
      <div id="categoryForm">
        <label for="category"><h3>Category</h3></label>
        <select id="ChooseCategory" style="width:15%; padding: 5px; margin-bottom: 10px;" name="chooseCategory">
          <option value="" disabled selected>Choose</option>
          <option value="Starters">Starters</option>
          <option value="Main Meal">Main Meal</option>
        </select>
      </div>
      <div id="itemSelectionForm">
        <h2 style="font-size: 18px; margin-bottom: 10px;position:relative;top:-83px;left:400px">Item Name</h2>
        <select id="dishSelect" style="width:15%; padding: 5px; margin-bottom: 10px;position:relative;top:-83px;left:400px">
          <option value="" disabled selected>Choose</option>
        </select>
      </div>
      <div id='price'></div>
      <div id="quantityForm"></div>
      <div id="amountForm"></div>
      <button id="addButton" style="display:none;position:relative;left:49cm;top:-9.4cm">Add</button>
      <div id="ordersContainer"></div>
      <p id="totalAmount" style="margin-top: 20px;"></p>
      <button id="submitButton">Submit</button>
    </form>
  `;

  var itemSelect = document.getElementById("ChooseCategory");
  var itemSelectionForm = document.getElementById('itemSelectionForm');
  var priceofDish = document.getElementById('dishSelect');
  var dishPriceContainer = document.getElementById('price');
  var quantityFormContainer = document.getElementById('quantityForm');
  var amountFormContainer = document.getElementById('amountForm');
  var addButton = document.getElementById('addButton');
  var ordersContainer = document.getElementById('ordersContainer');
  var totalAmountElement = document.getElementById('totalAmount');
  var totalAmount = 0;

  itemSelect.addEventListener('change', function() {
    var selectedOption = itemSelect.value;
    var itemOptions = '';

    if (selectedOption === 'Starters') {
      itemOptions = `
        <option value="" disabled selected>Choose</option>
        <option value="Garlic Bread">Garlic Bread</option>
      `;
    } else if (selectedOption === 'Main Meal') {
      itemOptions = `
        <option value="" disabled selected>Choose</option>
        <option value="Veg Family Meal">Veg Family Meal</option>
      `;
    }

    priceofDish.innerHTML = itemOptions;
    dishPriceContainer.innerHTML = '';
    quantityFormContainer.innerHTML = '';
    amountFormContainer.innerHTML = '';
    addButton.style.display = 'none';
  });

  priceofDish.addEventListener('change', function() {
    var dishPrice = priceofDish.value;

    if (dishPrice === 'Garlic Bread') {
      dishPriceContainer.innerHTML = `
        <form class='orderForm' style="padding: 20px; margin-top:20px;">
          <h2 style="font-size: 18px; margin-bottom: 10px;position:relative;top:-160px;left:730px">Price</h2>
          <input type='text' style="width:15%;position:relative;top:-160px;left:730px" id='inputPrice1' readonly>
        </form>
      `;

      var a = document.getElementById('inputPrice1');
      a.value = '2.8';
    } else if (dishPrice === 'Veg Family Meal') {
      dishPriceContainer.innerHTML = `
        <form class='orderForm' style="padding: 20px; margin-top:20px;">
          <h2 style="font-size: 18px; margin-bottom: 10px;position:relative;top:-160px;left:730px">Price</h2>
          <input type='text' style="width:15%;position:relative;top:-160px;left:730px" id='inputPrice2' readonly>
        </form>
      `;

      var a = document.getElementById('inputPrice2');
      a.value = '13';
    }

    quantityFormContainer.innerHTML = `
      <form class="orderForm" style="padding: 20px; margin-top: 20px;">
        <h2 style="position:relative;top:-245px;left:1100px" >Quantity</h2>
        <input type="number" id="quantityInput" style="width:15%;position:relative;top:-245px;left:1100px" padding: 5px;">
      </form>
    `;

    amountFormContainer.innerHTML = `
      <form class="orderForm" style="padding: 20px; margin-top: 20px;">
       <h2 style="position:relative;top:-330px;left:1450px">Amount</h2>
        <input type="number" id="amountInput" style="width:15%;position:relative;top:-330px;left:1450px"" readonly>
      </form>
    `;

    var quantityInput = document.getElementById('quantityInput');
    var amountInput = document.getElementById('amountInput');
    var addButton = document.getElementById('addButton');

    quantityInput.addEventListener('input', updateAmount);

    addButton.style.display = 'block';
    document.getElementById("addButton").addEventListener('click', function(event) {
      event.preventDefault(); 
    
      var category = document.getElementById("ChooseCategory").value;
      var item = document.getElementById("dishSelect").value;
      var quantity = document.getElementById("quantityInput").value;
      var amount = document.getElementById("amountInput").value;
      var orderSummary= document.createElement('h2');
      orderSummary.innerHTML= `Order Summary`;
      
      var orderDetails = document.createElement('p');
      orderDetails.innerHTML = `Category: ${category}, Item: ${item}, Quantity: ${quantity}, Amount: ${amount}`;
      ordersContainer.appendChild(orderDetails);
      totalAmount += parseFloat(amount);
      totalAmountElement.innerHTML = `Total Amount: ${totalAmount.toFixed(2)}`;
      itemSelect.value = '';
      priceofDish.innerHTML = '<option value="" disabled selected>Choose</option>';
      dishPriceContainer.innerHTML = '';
      quantityFormContainer.innerHTML = '';
      amountFormContainer.innerHTML = '';
      addButton.style.display = 'none';
    });
  });

  function updateAmount() {
    var quantity = parseInt(quantityInput.value);
    var priceInput = document.getElementById('inputPrice1') || document.getElementById('inputPrice2');
    var price = parseFloat(priceInput.value);

    var amount = quantity * price;
    amountInput.value = amount.toFixed(2);
  }

  var submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', function(event) {
    event.preventDefault();
    alert(`Total Amount to be Paid: $${totalAmount.toFixed(2)}`);
    submitButton.addEventListener('click', function(event) {
      event.preventDefault();
      alert(`Total Amount to be Paid: $${totalAmount.toFixed(2)}`);
    });
  });
});
// do not delete the code given below, it is written to export the functions to be tested
module.exports = submitOrder;