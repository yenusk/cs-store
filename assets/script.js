
// Load products from JSON and render them when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    fetch('./products.json')
        .then(response => response.json())
        .then(data => {
            // Render products for each category
            renderProducts('latest', data.products.latest);
            renderProducts('shoes', data.products.shoes);
            renderProducts('perfume', data.products.perfume);
            renderProducts('laptop', data.products.laptop);
            renderProducts('watch', data.products.watch);
            renderProducts('jacket', data.products.jacket);
            renderProducts('phone', data.products.phone);
        })
        .catch(error => console.error('Error loading products:', error));
});

function renderProducts(category, products) {
    const container = document.getElementById(`${category}-products`);
    container.innerHTML = ''; // Clear existing content
    window.currentSection = category; // Track current section
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'card product';
        
        // Special handling for laptops with specs
        const specs = product.specs ? `<div class="desc">${product.specs}</div>` : '';
        
        productCard.innerHTML = `
            <div class="img"><img src="${product.image}" alt="${product.name}"></div>
            <div class="desc">${product.desc}</div>
            <div class="title">${product.name}</div>
            ${specs}
            <div class="box">
                <div class="price">$${product.price}</div>
                <button class="add-to-cart btn" 
                    data-id="${product.id}" 
                    data-name="${product.name}" 
                    data-price="${product.price}" 
                    data-image="${product.image}">
                    Add to Cart
                </button>
            </div>
        `;
        
        container.appendChild(productCard);
    });
    
    // Reattach event listeners to new buttons
    attachCartEventListeners();
}

function attachCartEventListeners() {
    document.querySelectorAll(".add-to-cart").forEach((button) => {
        // Remove any existing listeners to prevent duplicates
        button.removeEventListener('click', handleAddToCart);
        
        // Add new listener
        button.addEventListener("click", handleAddToCart);
    });
}

// Separate handler function for better organization
function handleAddToCart() {
    empty.textContent = " ";
    checkOut.style.display = "block";
    const productId = this.getAttribute("data-id");
    const productName = this.getAttribute("data-name");
    const productPrice = this.getAttribute("data-price");
    const productImage = this.getAttribute("data-image");

    addToCart(productId, productName, productPrice, productImage);
}

// Array to store cart items
let cart = [];

// Updated addToCart function
function addToCart(productId, productName, productPrice, productImage) {
  // Create a unique identifier by combining section and productId
  const uniqueId = `${window.currentSection || 'latest'}_${productId}`;
  
  // Check if product is already in cart
  const existingItem = cart.find((item) => item.uniqueId === uniqueId);
  
  if (existingItem) {
    // Increase quantity if product is already in cart
    existingItem.quantity += 1;
  } else {
    // Add new product to cart
    cart.push({
      uniqueId: uniqueId,
      id: productId,
      name: productName,
      price: parseFloat(productPrice), // Ensure price is a number
      image: productImage,
      quantity: 1
    });
  }

  // Update cart display
  displayCart();
}
function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  // Clear cart items
  cartItems.innerHTML = "";
  let total = 0;
  let totalQuantity = 0;
  let cartSpan = document.getElementById("cart-span");
  
  // Display each cart item
  cart.forEach((item) => {
    const div = document.createElement("div");
    totalQuantity = totalQuantity + item.quantity;
    div.innerHTML = `
          <img src="${item.image}" alt="${item.name}" >
          <p>${item.name} ${" &nbsp; ~ &nbsp;"}  $${item.price} x ${
      item.quantity
    }  ${" "}</p>
      `;
    cartItems.appendChild(div);
    cartItems.style.display = "block";
    total += item.price * item.quantity;
  });
  
  // Update total price
  cartTotal.textContent = total.toFixed(2);
  // Update total quantity
  cartSpan.innerText = totalQuantity;
}
// Add event listeners to buttons
 let empty = document.getElementById("empty");
let checkOut = document.getElementById("checkOut");
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    empty.textContent = " ";
    checkOut.style.display = "block";
    const productId = button.getAttribute("data-id");
    const productName = button.getAttribute("data-name");
    const productPrice = button.getAttribute("data-price");
    const productImage = button.getAttribute("data-image");
    const productMinus = button.getAttribute("data-minus");
    const productAdder = button.getAttribute("data-add");

    addToCart(
      productId,
      productName,
      productPrice,
      productImage,
      productMinus,
      productAdder
    );
  });
});

//hide and show shopping cart
let cartIcon = document.getElementById("icon-cart");
let shop = document.getElementById("shopping-cart");
let body = document.querySelector("body");
let sec = document.querySelectorAll(".sec")
let phone = document.getElementById("phone")
let jack =document.getElementById("jacket")
let watch = document.getElementById("watch")
let lap =document.getElementById("laptop")
let perfume = document.getElementById("perfume")
let shoe =document.getElementById("shoes")
let collect=document.getElementById("collection")
let latest =document.getElementById("latest")
let hero = document.getElementById("hero")
let close = document.getElementById("close");
let payment = document.getElementById("payment");
let payBtn = document.getElementById("pay-with");
let success = document.getElementById("success");
let footer = document.getElementById("footer");

cartIcon.addEventListener("click", () => {
    shop.style.display= "block";
    phone.classList.toggle("hidden");
    jack.classList.toggle("hidden");
    watch.classList.toggle("hidden");
    lap.classList.toggle("hidden");
    perfume.classList.toggle("hidden");
    shoe.classList.toggle("hidden");
    collect.classList.toggle("hidden");
    latest.classList.toggle("hidden");
    hero.classList.toggle("hidden");
    footer.classList.toggle("hidden");
});
close.addEventListener("click", () => {
  sec.classList.toggle("show");
});
checkOut.addEventListener("click", () => {
  payment.style.display = "block";
});

// let payment = document.getElementById("payment")
let choosenToPay = document.getElementById("success")
let toApply = document.getElementById("inner-success")
let apply = document.getElementById("to-apply")
let successful = document.getElementById("successful")
let telebirr=document.getElementById("telebirr");
let cbe=document.getElementById("cbe");
let amole=document.getElementById("amole");
let boa=document.getElementById("boa");
let ebirr=document.getElementById("ebirr");
let back = document.getElementById("back")

telebirr.addEventListener("click",()=>{
  choosenToPay.textContent="You have Choose TELEBIRR Payment Method. Click 👇 'Apply' 👇 to Apply and Confirm...",
  toApply.textContent="Apply";
  successful.textContent=" ";
});
cbe.addEventListener("click",()=>{
  choosenToPay.textContent="You have Choose Commercial Bank of Ethiopa Payment Method. Click 👇 'Apply' 👇 to Apply and Confirm...",
  toApply.textContent="Apply";
  successful.textContent=" ";
});
amole.addEventListener("click",()=>{
  choosenToPay.textContent="You have Choose AMOLE Payment Method. Click 👇 'Apply' 👇 to Apply and Confirm...",
  toApply.textContent="Apply";
  successful.textContent=" ";
});
boa.addEventListener("click",()=>{
  choosenToPay.textContent="  You have Choose Bank of Abysinia Payment Method. Click 👇 'Apply' 👇 to Apply and Confirm...",
  toApply.textContent="Apply";
  successful.textContent=" ";
});
ebirr.addEventListener("click",()=>{
  choosenToPay.textContent="You have Choose E-BIRR Payment Method. Click 👇 'Apply' 👇 to Apply and Confirm...",
  toApply.textContent="Apply";
  successful.textContent=" ";
});
toApply.addEventListener("click",()=>{
  choosenToPay.textContent="SUCCESSFULL!";
  toApply.textContent="Applied!"
  successful.textContent="Great!, You Have Successfully Applied Your Payment Method. Thanks For Choosing Us!"
  back.style.display="block";
});

  // Menu dropdown toggler
  function menuFun() {
    document.getElementById("myDropdown").classList.toggle("dropped");
  };
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('dropped')) {
          openDropdown.classList.remove('dropped');
        }
      }
    }
  }; 