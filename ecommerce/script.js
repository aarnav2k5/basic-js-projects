document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 300,
    },
    {
      id: 2,
      name: "Product 2",
      price: 500,
    },
    {
      id: 3,
      name: "Product 3",
      price: 700,
    },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCart = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalPrice = document.getElementById("total-price");
  const checkoutButton = document.getElementById("checkout-btn");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <span> ${product.name} - $${product.price.toFixed(2)}</span>
    <button data-id =${product.id}>Add to Cart</button>`;
    productList.appendChild(productDiv);
  });

  function deleteFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }

  function addToCart(product) {
    cart.push(product);
    saveCart();
    renderCart();
  }

  function renderCart() {
    cartItems.innerHTML = "";
    let totalprice = 0;
    if (cart.length > 0) {
      emptyCart.classList.add("hidden");
      cartTotal.classList.remove("hidden");
      cart.forEach((item, index) => {
        totalprice += item.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}
        <button class="remove" data-index="${index}">Remove</button>`;
        cartItems.appendChild(cartItem);
        totalPrice.textContent = `$${totalprice.toFixed(2)}`;
      });
    } else {
      emptyCart.classList.remove("hidden");
      totalPrice.textContent = `$0.00`;
    }
  }

  checkoutButton.addEventListener("click", () => {
    cart.length = 0;
    alert("checkout successfully");
    saveCart();
    renderCart();
  });

  cartItems.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const index = parseInt(e.target.getAttribute("data-index"));
      deleteFromCart(index);
    }
  });

  productList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  renderCart();
});
