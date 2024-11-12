// Function to display items in the wishlist
function displayWishlistItems() {
  const wishlistContainer = document.getElementById("wishlistContainer"); // Change to your actual wishlist container ID
  wishlistContainer.innerHTML = ""; // Clear previous wishlist items
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []; // Get wishlist from local storage

  if (wishlist.length === 0) {
    wishlistContainer.innerHTML =
      '<tr><td colspan="4">Your wishlist is empty</td></tr>'; // Adjust columns as necessary
    updateWishlistCount(0); // Update the count for an empty wishlist
    return;
  }

  wishlist.forEach((item) => {
    // Changed from Mouse to item for a generic approach
    const row = document.createElement("tr");

    // Image
    const imgCell = document.createElement("td");
    const img = document.createElement("img");
    img.src = item.image; // Assuming items in wishlist also have an image
    img.width = 150;
    img.height = 100;
    img.alt = item.name; // Changed from Mouse.name to item.name
    imgCell.appendChild(img);
    row.appendChild(imgCell);

    // Product Name
    const nameCell = document.createElement("td");
    nameCell.textContent = item.name; // Changed from Mouse.name to item.name
    row.appendChild(nameCell);

    // Price
    const priceCell = document.createElement("td");
    priceCell.textContent = `${item.price.toLocaleString()} L.E`; // Changed from Mouse.price to item.price
    row.appendChild(priceCell);

    // Remove button
    const actionCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-danger";
    removeButton.textContent = "Remove"; // Change button text to indicate removal
    removeButton.onclick = () => {
      removeFromWishlist(item.id); // Changed from Mouse.id to item.id
    };
    actionCell.appendChild(removeButton);
    row.appendChild(actionCell);

    wishlistContainer.appendChild(row);
  });

  updateWishlistCount(wishlist.length); // Update the count after rendering wishlist items
}

// Function to remove an item from the wishlist
function removeFromWishlist(id) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []; // Get the wishlist from local storage
  wishlist = wishlist.filter((item) => item.id !== id); // Remove the item with the specified ID
  localStorage.setItem("wishlist", JSON.stringify(wishlist)); // Save updated wishlist to local storage
  displayWishlistItems(); // Re-render the wishlist after removing the item
}

// Function to update the wishlist count display
function updateWishlistCount(count) {
  document.getElementById("heartCount").textContent = count || 0; // Update the heart count in the HTML, ensure count is not NaN
}

// Function to add an item to the wishlist
function addToWishlist(item) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []; // Get the wishlist from local storage

  // Check if the item is already in the wishlist
  const itemExists = wishlist.some(
    (wishlistItem) => wishlistItem.id === item.id
  );
  if (!itemExists) {
    wishlist.push(item); // Add the new item to the wishlist
    localStorage.setItem("wishlist", JSON.stringify(wishlist)); // Save updated wishlist to local storage
  }

  // Update the count automatically without alert
  updateWishlistCount(wishlist.length); // Update the count
}

// Listen for storage changes (for instance, when adding/removing items from other tabs)
window.addEventListener("storage", (event) => {
  if (event.key === "wishlist") {
    displayWishlistItems(); // Refresh wishlist items if the wishlist in local storage changes
  }
});

// Update the wishlist count on page load
document.addEventListener("DOMContentLoaded", () => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || []; // Get the wishlist from local storage
  updateWishlistCount(wishlist.length); // Set initial count from localStorage
});

// Display wishlist items on page load
window.onload = displayWishlistItems;
