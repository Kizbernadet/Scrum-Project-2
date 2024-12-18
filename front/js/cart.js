const cartContainer = document.querySelector("#cartItems");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

if (cart.length === 0) {
  cartContainer.innerHTML = "<p>Votre panier est vide.</p>";
} else {
  let total = 0;

  cart.forEach((product) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <div class="cart-item-details">
        <p><strong>Produit :</strong> ${product.id}</p>
        <p><strong>Couleur :</strong> ${product.color}</p>
        <p><strong>Quantité :</strong> ${product.quantity}</p>
      </div>
    `;
    cartContainer.appendChild(cartItem);

    // Ajouter au total
    total += product.quantity * product.price; // Assure-toi que `product.price` existe
  });

  // Afficher le total
  const totalElement = document.createElement("p");
  totalElement.innerHTML = `<strong>Total :</strong> ${total} €`;
  cartContainer.appendChild(totalElement);
}
