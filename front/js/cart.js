// Sélectionne la balise container dans la page cart.html
const cartContainer = document.querySelector("#cart__items");

// API URL
const api_url = "http://localhost:3000/api/products";

// Variable de stockage de la localStorage 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

console.log("LocalStorage : ", cart);

// Selectionner des balises pour gérer l'augmentation ou la dimunition de la quantité
let itemQuantity = document.querySelectorAll(".itemQuantity");

// Fonction qui se déclenche lorsqu'on clique sur le bouton pour augmenter la quantité du produit
itemQuantity.addEventListener("click", (e) => {
    console.log("Cliqué");
})

// Main code 
if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Votre panier est vide.</p>";
  } else {
    for (item of cart) {
  
      // Sélectionner la couleur choisie pour chaque produit et la quantité
      let selectedColor = item.color;
      let productQuantity = item.quantity;
  
      // Sélectionner l'URL du produit
      const productUrl = `http://localhost:3000/api/products/${item.id}`;
  
      fetch(productUrl)
        .then(response => response.json())
        .then((data) => {
          // Calculer le prix total pour ce produit
          let productPrice = data.price * productQuantity;
  
          // Ajouter ce prix au montant total
          totalAmount += productPrice;
  
          // Ajouter les éléments au DOM
          cartContainer.innerHTML += `
            <article class="cart__item" data-id="${data.id}" data-color="${selectedColor}">
              <div class="cart__item__img">
                <img src="${data.imageUrl}" alt="${data.altTxt}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${data.name}</h2>
                  <p>${selectedColor}</p>
                  <p>${data.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : ${productQuantity}</p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productQuantity}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>
          `;
  
          // Afficher le montant total après avoir ajouté tous les produits
          cartTotal.textContent = totalAmount;
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des produits :", error);
        });
    }
  
    // Boucle pour chaque article dans le panier pour calculer la quantité totale
    for (item of cart) {
      totalQuantity += item.quantity;
    }
  
    // Afficher le nombre total d'articles dans le panier
    cartQuantity.textContent = totalQuantity;
  }
  
