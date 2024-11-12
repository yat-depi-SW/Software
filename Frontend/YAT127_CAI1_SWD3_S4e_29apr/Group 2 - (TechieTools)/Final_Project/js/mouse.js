// Initialize wishlist and cart from localStorage
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display heart icons
function displayWishlistState() {
  wishlist.forEach((item) => {
    const heartIcon = document.querySelector(
      `.mouse-card[data-id="${item.id}"] .add-to-wishlist`
    );
    if (heartIcon) {
      heartIcon.classList.remove("fa-regular");
      heartIcon.classList.add("fa-solid", "text-danger");
    }
  });
}

// Function to add/remove items from the wishlist
function handleWishlist() {
  const addToWishlistIcons = document.querySelectorAll(".add-to-wishlist");

  addToWishlistIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const card = this.closest(".mouse-card");
      const cardData = {
        id: card.getAttribute("data-id"),
        name: card.getAttribute("data-name"),
        price: card.getAttribute("data-price"),
        image: card.getAttribute("data-image"), // Include image source
      };

      // Check if the item is already in the wishlist
      const isInWishlist = wishlist.some((item) => item.id === cardData.id);

      if (!isInWishlist) {
        wishlist.push(cardData);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        // Change heart icon to filled
        this.classList.remove("fa-regular");
        this.classList.add("fa-solid", "text-danger");

        updateHeartCount();
      } else {
        // Remove item from wishlist
        wishlist = wishlist.filter((item) => item.id !== cardData.id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        // Change heart icon back to outline
        this.classList.remove("fa-solid", "text-danger");
        this.classList.add("fa-regular");

        updateHeartCount();
      }
    });
  });
}

// Function to add items to the cart (similar to wishlist)
function handleCart() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".mouse-card");
      const cardData = {
        id: card.getAttribute("data-id"),
        name: card.getAttribute("data-name"),
        price: card.getAttribute("data-price"),
        image: card.getAttribute("data-image"), // Include image source
      };

      // Check if the item is already in the cart
      const isInCart = cart.some((item) => item.id === cardData.id);

      if (!isInCart) {
        cart.push({
          ...cardData,
          quantity: 1, // Add quantity to cart item
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
      }
    });
  });
}

// Function to update the heart count display (wishlist)
function updateHeartCount() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  document.getElementById("heartCount").textContent = wishlist.length;
}

// Function to update the cart count display
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cartCount").textContent = cart.length;
}

// Call the functions to enable the wishlist and cart functionality
handleWishlist();
handleCart();
displayWishlistState();
updateHeartCount();
updateCartCount();
