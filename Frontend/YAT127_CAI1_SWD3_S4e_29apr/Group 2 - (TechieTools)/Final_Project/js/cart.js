// Function to display items in the cart
function displayCartItems() {
  const cartContainer = document.getElementById("cartContainer");
  cartContainer.innerHTML = ""; // Clear previous cart items
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartContainer.innerHTML =
      '<tr><td colspan="5">Your cart is empty</td></tr>';
    updateCartSummary(); // Update the summary for an empty cart
    return;
  }

  cart.forEach((item) => {
    // Changed 'mouse' to 'item'
    const row = document.createElement("tr");

    // Image
    const imgCell = document.createElement("td");
    const img = document.createElement("img");
    img.src = item.image;
    img.width = 150;
    img.height = 100;
    img.alt = item.name;
    imgCell.appendChild(img);
    row.appendChild(imgCell);

    // Product Name
    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;
    row.appendChild(nameCell);

    // Price
    const priceCell = document.createElement("td");
    priceCell.textContent = `${item.price.toLocaleString()} L.E`; // Format price with commas
    row.appendChild(priceCell);

    // Quantity
    const quantityCell = document.createElement("td");
    const quantityWrapper = document.createElement("div");
    quantityWrapper.className = "quantity-wrapper";

    // Quantity input element
    const quantityInputElement = document.createElement("input");
    quantityInputElement.type = "number";
    quantityInputElement.style.width = "40px";
    quantityInputElement.value = item.quantity; // Set initial quantity
    quantityInputElement.min = 1; // Minimum value is 1
    quantityInputElement.className = "quantity-input";
    quantityInputElement.onchange = () => {
      const newQuantity = parseInt(quantityInputElement.value);
      if (newQuantity >= 1) {
        updateQuantity(item.id, newQuantity); // Update the quantity in the cart
      } else {
        quantityInputElement.value = 1; // Reset to 1 if user enters a value less than 1
      }
    };

    // Append the input element to the wrapper
    quantityWrapper.appendChild(quantityInputElement);
    // Append the wrapper to the quantity cell
    quantityCell.appendChild(quantityWrapper);
    row.appendChild(quantityCell);

    // Remove button
    const actionCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-danger";
    removeButton.textContent = "X";
    removeButton.onclick = () => {
      removeFromCart(item.id); // Remove item when clicked
    };
    actionCell.appendChild(removeButton);
    row.appendChild(actionCell);

    cartContainer.appendChild(row);
  });

  updateCartSummary(); // Update the summary after rendering cart items
}

// Function to remove an item from the cart without reloading the page
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems(); // Re-render the cart after removing the item
}

// Function to update the quantity of an item
function updateQuantity(id, newQuantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const updatedCart = cart.map((item) => {
    if (item.id === id) {
      item.quantity = newQuantity; // Update the quantity
    }
    return item;
  });
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  displayCartItems(); // Re-render the cart after updating the quantity
}

// Function to calculate total and item count
function updateCartSummary() {
  const itemCountElement = document.getElementById("itemCount");
  const totalPriceElement = document.getElementById("totalPrice");

  const cart = JSON.parse(localStorage.getItem("cart")) || []; // Access the cart
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0); // Total quantity of items in the cart
  const totalPrice = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2); // Total price of items

  itemCountElement.textContent = itemCount; // Update item count
  totalPriceElement.textContent = `${totalPrice} L.E`; // Update total price
}

// Listen for storage changes (for instance, when adding/removing items from other tabs)
window.addEventListener("storage", (event) => {
  if (event.key === "cart") {
    displayCartItems(); // Refresh cart items if the cart in local storage changes
  }
});

// Update the cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount(cart.length); // Set initial count from localStorage
});

// Display cart items on page load
window.onload = displayCartItems;
