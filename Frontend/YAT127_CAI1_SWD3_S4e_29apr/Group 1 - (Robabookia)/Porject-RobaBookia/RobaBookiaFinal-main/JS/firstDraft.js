
/*---------Fetch Book Detaiks-------------*/
console.log(1)
document.getElementById('book-search-form').addEventListener('submit', function(e) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '<div class="loader2" id="loader"></div>';
    e.preventDefault(); // Prevent the page from refreshing
    const query = document.getElementById('book-search-input').value;
    // let dropDown = document.getElementById('dropDown');
    // dropDown.innerHTML = "Choose a Genre"
    showLoader(); // Show the loader when fetching starts
    fetchBookCovers(query);
});
document.getElementById('book-search-form-2').addEventListener('submit', function(e) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '<div class="loader2" id="loader"></div>';
    e.preventDefault(); // Prevent the page from refreshing
    const query = document.getElementById('book-search-input-2').value;
    // let dropDown = document.getElementById('dropDown');
    // dropDown.innerHTML = "Choose a Genre"
    showLoader(); // Show the loader when fetching starts
    fetchBookCovers(query);
});
function fetchBookCovers(query) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=6&orderBy=relevance&langRestrict=en`)
        .then(response => response.json())
        .then(data => {
            const books = data.items || []; // Google Books returns an 'items' array
            if (books.length > 0) {
                const descriptionPromises = books.map(book => getBookDetails(book.id)); // Change book key to id
                Promise.all(descriptionPromises).then(descriptions => {
                    displayBookCovers(books, descriptions);
                });
            } else {
                displayError('No books found');
                hideLoader();
            }
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            displayError('An error occurred');
            hideLoader();
        });
}
/*---------show and Hide Loader-------------*/
function showLoader() {
    document.getElementById('loader').style.display = 'block'; // Show the loader
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none'; // Hide the loader
}
let publisher = ['Penguin Random House', 'Hachette', 'HarperCollins']
/*---------Constructing Books-------------*/
function displayBookCovers(books, details) {
    const container = document.getElementById('cards-container');
    container.innerHTML = ''; // Clear previous results
    books.forEach((book, index) => {
        const volumeInfo = book.volumeInfo;
        const coverUrl = volumeInfo.imageLinks?.thumbnail || 'default-cover.jpg'; // Fallback if no cover
        const title = volumeInfo.title || 'No title available';
        const author = volumeInfo.authors ? volumeInfo.authors.join(', ') : 'Unknown Author';
        const descriptionText = details[index].description || 'No description available';
        const genres = details[index].categories ? details[index].categories : 'No genre available';
        const publisher = details[index].publisher ? details[index].publisher : 'No publisher available';
        console.log(genres)
        const cleanedDescription = cleanDescription(descriptionText);
        const randomNumber = Math.floor(Math.random() * 1000); // Generate random price
        const randomNumber2 = Math.floor(Math.random() * 2); // Generate random price
        console.log(cleanedDescription)
        container.innerHTML += `
            <div class="card haveHover" data-genre="${genres} ${publisher}">
              <div class="card-img">
               <img class="bookImg" src="${coverUrl}" alt="Book Cover">
              </div>
                <div class="card-info">
                    <h2 class="bookTitle">${title}</h2>
                    <p>${author}</p>
                    <div class="icons">
                    <div class="rating">
                            <input type="number" name="rating" hidden >
                            <i class='bx bx-star star' style="--i: 0;"></i>
                            <i class='bx bx-star star' style="--i: 1;"></i>
                            <i class='bx bx-star star' style="--i: 2;"></i>
                            <i class='bx bx-star star' style="--i: 3;"></i>
                            <i class='bx bx-star star' style="--i: 4;"></i>
                        </div>
                        <p class="p3 price">$${randomNumber}</p>
                    </div>
                    <div class="buttons">
                        <button class="btn-details showDescription haveHover">Description</button>
                        <button class="btn-buy haveHover buy" id="${book.id}">Buy <i class="fa-solid fa-cart-plus"></i></button>
                    </div>
                </div>
                <div class="popoverr">
                    <div class="descriptionBox">
                        <button class="hideDescription">x</button>   
                        <div class="descriptionBookDetails">
                            <img class="descriptionImage" src="${coverUrl}" alt="Cover of ${title}">
                            <div>
                                <div>
                                    <h4>${title}</h4>
                                    <p class="descName">${author}</p>
                                </div>
                                <div class="descText">${cleanedDescription}</div>
                                <a href="${volumeInfo.infoLink}" target="_blank">
                                    <button type="button" class="moreDetails btn-secondary">See more Details</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        `;
    });
    // hideLoader(); // Hide the loader after displaying results
    const allCards = document.querySelectorAll('.card');

allCards.forEach(card => {
  // For each card, find its stars and rating input
  const allStar = card.querySelectorAll('.rating .star');
  const ratingValue = card.querySelector('.rating input');

  allStar.forEach((item, idx) => {
    item.addEventListener('click', function () {
      let click = 0;
      ratingValue.value = idx + 1;

      // Reset all stars in this card only
      allStar.forEach(i => {
        i.classList.replace('bxs-star', 'bx-star');
        i.classList.remove('active');
      });

      // Set active stars in this card only
      for (let i = 0; i < allStar.length; i++) {
        if (i <= idx) {
          allStar[i].classList.replace('bx-star', 'bxs-star');
          allStar[i].classList.add('active');
        } else {
          allStar[i].style.setProperty('--i', click);
          click++;
        }
      }
    });
  });
});
}


/*---------Hide Description-------------*/
document.body.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('hideDescription')) {
        const button = e.target;
        const popoverr = button.closest('.popoverr');
        const hoverBooks = document.body.querySelectorAll('.notHover')
        const blackScreen = document.body.querySelector('.blackScreen')
        hoverBooks.forEach((hoverBook) =>{
            hoverBook.classList.remove('notHover')
            hoverBook.classList.add('haveHover')
        })
        popoverr.remove()
        blackScreen.remove()
    }
});

/*---------Show Description-------------*/
document.getElementById('cards-container').addEventListener('click', (e) => {
    if (e.target && e.target.closest('.showDescription')) {
        const button = e.target.closest('.showDescription');
        const book = button.closest('.card');
        const desc = book.querySelector('.popoverr'); // Corrected to use class name
        const newDesc = desc.cloneNode(true)
        const hoverBooks = document.body.querySelectorAll('.haveHover')
        hoverBooks.forEach((hoverBook) =>{
            hoverBook.classList.remove('haveHover')
            hoverBook.classList.add('notHover')
        })
        let blackScreen = document.createElement('div')
        blackScreen.classList.add('blackScreen')
        document.body.append(newDesc)
        newDesc.classList.add('popoverr-visible');
        document.body.append(blackScreen)
        setTimeout(() => {blackScreen.style.opacity = .9; newDesc.style.opacity = 1;}, 200);
        const bodyClickHandler = (e) => {
            if (!e.target.closest('.descriptionBox') && !e.target.closest('.showDescription')) {
                const hoverBooks = document.body.querySelectorAll('.notHover')
                hoverBooks.forEach((hoverBook) =>{
                    hoverBook.classList.remove('notHover')
                    hoverBook.classList.add('haveHover')
                })
                newDesc.remove()
                blackScreen.remove()
                document.removeEventListener('click', bodyClickHandler);
            }
        };
        document.addEventListener('click', bodyClickHandler);
    }
});




/*---------Cart Items-------------*/
let numOfItems = 0; // Use 'let' instead of 'const' to allow updates
const cartNumb = document.getElementById('num');
let noItemsDiv = document.createElement('div');
let purchases =  document.getElementById('allPurchasedItems');
let checkout = document.querySelector('.checkout')
let Totalprice = 0;

localStorage.setItem('key', Totalprice)
noItemsDiv.innerHTML = "<p>No item in the cart</p><img src='images/empty cart.png' class='emptyCart'>"
noItemsDiv.classList.add('noItemsDiv')
if(numOfItems == 0){
    checkout.style.display = "none";
    cartNumb.style.display="none";
    purchases.append(noItemsDiv);
}
/*---------Clicking on buy-------------*/

document.getElementById('cards-container').addEventListener('click', (e) => {
    if (e.target && e.target.closest('.buy')) {
        const button = e.target.closest('.buy');
        const parent = e.target.closest('.card')
        const title = parent.querySelector('.bookTitle').innerHTML
        const imgUrl = parent.querySelector('.bookImg').src;
        const price = parent.querySelector('.price')
        let priceInNumber = price.innerHTML.slice(1);
        console.log(priceInNumber)
        Totalprice += Number(priceInNumber);
        localStorage.setItem('key', Totalprice)
        // console.log(button.disapled)
        if(button.disapled == false || !button.disapled){addPurchasedItem(title, imgUrl, priceInNumber, button);}
        if (!button.classList.contains('bought')) {
            button.classList.add('bought'); // Add the 'bought' class to mark as purchased
            button.innerHTML = `Bought <i class="fa-solid fa-cart-flatbed"></i>`;
            numOfItems++; 
            cartNumb.innerHTML = numOfItems; // Update cart number display
            button.disapled = 1;
            cartNumb.style.display="";
        }
    }
});
/*---------Clicking on Cart-------------*/
document.getElementById('cart').addEventListener('click', (e) => {
    if (!e.target.closest('.purchases')) {
        let parent = e.target.closest('.cart');
        const purchases = parent.querySelector('.purchases');
        if (purchases.classList.contains('show')) {
            // Start fading out by removing the show class
            purchases.classList.remove('show');
            // Wait for the opacity transition to finish before hiding the element
            setTimeout(() => {
                purchases.style.visibility = 'hidden';
            }, 200); // This matches the transition duration (0.5s)
            
        } else {
            // Make it visible immediately, then trigger the opacity animation
            purchases.style.visibility = 'visible';
            purchases.classList.add('show');
            const bodyClickHandler = (e) => {
                if (!e.target.closest('.purchases') && !e.target.closest('.cart')) {
                    purchases.classList.remove('show');
                    
                    // Wait for the opacity transition to finish before hiding the element
                    setTimeout(() => {
                        purchases.style.visibility = 'hidden';
                    }, 200); // This matches the transition duration (0.2s)
                    console.log(e.target.tagName)
                    
                    // Remove the body event listener once the task is done
                    document.removeEventListener('click', bodyClickHandler);
                }
            };
            document.addEventListener('click', bodyClickHandler);
        }
    }
});


/*---------Remove Items-------------*/
document.getElementById('cart').addEventListener('click', (e) =>{
    if(e.target.closest('.removeAddedItem')){
        e.stopPropagation();  // Prevent the event from bubbling to the body click handler
        let cancelButton = e.target.closest('.removeAddedItem')
        let newPurchasedItem = e.target.closest('.purchasedItems')
        let purchaseButtonId = cancelButton.dataset.button
        let purchaseButton = document.getElementById(purchaseButtonId);
        let parent = purchaseButton.closest('.card');
        let price = parent.querySelector('.price')
        let priceInNumber = price.innerHTML.slice(1);
        console.log(parent)
        // let priceInNumber = price.innerHTML.slice(1);
        Totalprice -= Number(priceInNumber);
        localStorage.setItem('key', Totalprice)

        if(purchaseButton){
            purchaseButton.classList.remove('bought'); 
            purchaseButton.innerHTML = `Buy <i class="fa-solid fa-cart-plus"></i>`;
            purchaseButton.disapled = 0;
        }
        numOfItems--; // Decrement number of items
        cartNumb.innerHTML = numOfItems; // Update cart number display
        newPurchasedItem.remove();
        if(numOfItems == 0){
            cartNumb.style.display="none";
            purchases.append(noItemsDiv);
            checkout.style.display = "none";

        }
        
    }
})
/*---------Add Items--------------*/
function addPurchasedItem(title, imgUrl, priceInNumber, button){
    let newPurchasedItem = document.createElement('div')
    newPurchasedItem.classList.add('purchasedItems')
    newPurchasedItem.innerHTML = ` 
        <img src="${imgUrl}" class="purchasedItemsImg">
        <div class="purchasedItemsName">
            <p class='purchasedItemsTitle'>${title}</p>
            <p class='purchasedItemsPrice'>$${priceInNumber}</p>
        </div>
       <button class="removeAddedItem" data-button="${button.id}">x</button>
    `
    noItemsDiv.remove()
    checkout.style.display = "block";
    purchases.append(newPurchasedItem)
    let addedNotification = document.createElement('div');
    addedNotification.classList.add('AddedNotification')
    addedNotification.innerHTML = "<h3>an item was added</h3><img src='images/done (1).gif' class='doneGif'></img>";
    document.body.append(addedNotification)
    setTimeout(() => addedNotification.remove(), 2000)
}
function cleanDescription(description) {
    // Remove any text after a specific delimiter, e.g., "([source]"
    const delimiterIndex = description.indexOf('([source]');
    return delimiterIndex !== -1 ? description.substring(0, delimiterIndex).trim() : description;
}

// Function to find the English edition or fallback to the first edition
function findEnglishEdition(book) {
    const englishEdition = book.edition_key && book.language && book.language.includes('eng')
        ? book.edition_key[1]
        : book.edition_key ? book.edition_key[1] : book.key;

    return `https://openlibrary.org/books/${englishEdition}`;
}

// Function to fetch the book description using the work key
function getBookDetails(bookId) {
    return fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        .then(response => response.json())
        .then(data => {
            const description = data.volumeInfo.description || 'No description available';
            const categories = data.volumeInfo.categories ? data.volumeInfo.categories : 'No genre available';
            const publisher = data.volumeInfo.publisher || 'No publisher available'; // Access the publisher here
            return {
                description: description,
                categories: categories,
                publisher: publisher // Return the publisher
            };
        })
        .catch(error => {
            console.error('Error fetching book details:', error);
            return {
                description: 'No description available',
                categories: 'No genre available',
                publisher: 'No publisher available' // Handle errors with default values
            };
        });
}


function displayError(message) {
    const container = document.getElementById('cards-container');
    container.innerHTML = `<p>${message}</p>`;
}

function Genre(){
    let books = document.querySelectorAll('.book')
    books.forEach((book) =>{
        let genres = book.dataset.genre
        console.log(1);
        if(genres.indexOf('romance') && -1 || genres.indexOf('Romance') === -1){
            book.hidden = 1;
        }
    })
}
document.querySelectorAll('.genre').forEach((button) => {
    button.addEventListener('click', (e) => {
        let books = document.querySelectorAll('.card');
        let visibleBooksCount = 0; // Counter to track visible books
        let type = e.target.dataset.type;
        let active = document.body.querySelector('.active')
        active.classList.remove('active');
        e.target.classList.add('active')
        document.getElementById('no-items-message')?.remove();
        books.forEach((book) => {
            let genres = book.dataset.genre;
            if(type === "allBooks"){
                visibleBooksCount++; 
                book.style.display = ''; // Show the book
            }
            else {
                if (genres.toLowerCase().includes(type.toLowerCase())) {
                    book.style.display = ''; // Show the book
                    visibleBooksCount++; // Increment count of visible books
                } else {
                    book.style.display = 'none'; // Hide the book
                }
            }
        });
        if (visibleBooksCount === 0) {
            const noItemsMessage = document.createElement('p');
            noItemsMessage.id = 'no-items-message'; 
            noItemsMessage.textContent = 'No items available for this genre.';
            document.getElementById('cards-container').appendChild(noItemsMessage);
        }
    });
});
document.querySelectorAll('input[name=category]').forEach((input) => {
    input.addEventListener('click', (e) => {
        let genres = Array.from(document.querySelectorAll('input[name=category]:checked')).map(inp => inp.value.toLowerCase().trim());

        let bookFound = false; // To track if any book is still visible

        document.querySelectorAll('.card').forEach((book) => {
            // Normalize the book's data-genre attribute, split by commas and trim spaces
            let bookGenres = book.dataset.genre.toLowerCase().split(',').map(genre => genre.trim());

            // Check if the book contains all selected genres
            if (genres.every(genre => bookGenres.some(bookGenre => bookGenre.includes(genre)))) {
                book.style.display = ''; // Show the book
                bookFound = true; // A book is visible
            } else {
                book.style.display = 'none'; // Hide the book
            }
        });
        if(!bookFound){
            if(!document.getElementById('noBook')){
                let noBooks = document.createElement('div');
                noBooks.innerHTML = "<img src = 'images/sign-159285_1280.png' width='200px'><h2>No Book Has Been Found</h2>";
                noBooks.id = 'noBook';
                noBooks.classList.add('noBookFound')
                document.getElementById('cards-container').append(noBooks)
            }
        }
        else{
            if(document.getElementById('noBook'))document.getElementById('noBook').remove()
        }
    });
});


//navbar
const menu = document.getElementById("menu");

Array.from(document.getElementsByClassName("menu-item")).forEach(
  (item, index) => {
    item.onmouseover = () => {
      menu.dataset.activeIndex = index;
    };
  }
);

function showMenu() {
  // Show the menu
  document.getElementById("menu").style.display = "flex";
  // Disable scrolling on the body when the menu is shown
  document.body.style.overflow = "hidden";
}

function hideMenu() {
  // Hide the menu
  document.getElementById("menu").style.display = "none";
  // Enable scrolling again
  document.body.style.overflow = "auto";
}

//To change the word of the navbar on hover
function changeTitle(newTitle) {
  document.getElementById("navbarTitle").textContent = newTitle;
}

function resetTitle() {
  document.getElementById("navbarTitle").textContent = "RobaBookia";
}

//navbar color change when scroll
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");

  // Adjust the scroll position where the color change occurs
  const triggerHeight = window.innerHeight * 2.6; // Adjust the multiplier for the desired position

  // Toggle the 'scrolled' class based on scroll position
  if (window.scrollY > triggerHeight) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

//preloader
document.addEventListener("DOMContentLoaded", function () {
    // Start the preloader animation
    gsap.to(".img", 2, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0% 0%)",
      ease: "power4.inOut",
      stagger: {
        amount: 1.5,
      },
    });
  
    // Animate the loader out after 2.4 seconds
    gsap.to(".loader", 2, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      ease: "power4.inOut",
      delay: 2.4,
      onComplete: function () {
        // Hide the loader after animation completes
        document.querySelector(".loader").style.display = "none";
      },
    });
  
    // Show the main content within 1 second after the preloader starts
    setTimeout(function () {
      document.getElementById("bodyContainer").style.visibility = "visible";
      document.getElementById("line").style.visibility = "visible";
      document.getElementById("book-search-form-2").style.visibility = "visible";
      document.getElementById("navbar").style.visibility = "visible";
      document.getElementById("fot").style.visibility = "visible";
    }, 1600); // Delay for 1.5 second (1500 ms)
  });


//Footer
  document.getElementById('subscribeForm').addEventListener('submit', function(event) {
    event.preventDefault();  

    const emailInput = document.getElementById('emailInput');
    const emailValue = emailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
        emailInput.classList.add('error'); 
    } else {
        emailInput.classList.remove('error'); 
        alert("Subscription successful!");
    }
});


const allCards = document.querySelectorAll('.card');

allCards.forEach(card => {
  // For each card, find its stars and rating input
  const allStar = card.querySelectorAll('.rating .star');
  const ratingValue = card.querySelector('.rating input');

  allStar.forEach((item, idx) => {
    item.addEventListener('click', function () {
      let click = 0;
      ratingValue.value = idx + 1;

      // Reset all stars in this card only
      allStar.forEach(i => {
        i.classList.replace('bxs-star', 'bx-star');
        i.classList.remove('active');
      });

      // Set active stars in this card only
      for (let i = 0; i < allStar.length; i++) {
        if (i <= idx) {
          allStar[i].classList.replace('bx-star', 'bxs-star');
          allStar[i].classList.add('active');
        } else {
          allStar[i].style.setProperty('--i', click);
          click++;
        }
      }
    });
  });
});