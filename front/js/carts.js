// Les variables utilisées 
// Sélectionne la balise container dans la page cart.html
const cartContainer = document.querySelector("#cart__items");

// API URL
const api_url = "http://localhost:3000/api/products";

// Variable de stockage de la localStorage 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Selectionne la balise total__price pour la gestion du montant total
const cartTotal = document.querySelector("#totalPrice");

// Variable pour stocker le montant total
let totalAmount = 0;

// Sélectionne la balise cartQuantity
const cartQuantity = document.querySelector("#totalQuantity");

// Variable pour stocker la quantité totale de produits
let totalQuantity = 0;


// Action de supprimer un produit
cartContainer.addEventListener(
    "click", (event) => {
        // event.target ne permet d'identifier la balise sur laquelle je clique
        const tag = event.target

        if (tag.className === "deleteItem"){
            const cartItem = event.target.closest(".cart__item");
            
            const id = cartItem.getAttribute("data-id");
            const color = cartItem.getAttribute("data-color");

            console.log(id, color);

            cartItem.remove()

            let cart = JSON.parse(localStorage.getItem("cart"))

            cart = cart.filter((item) => id)

            console.log(cart);

        }
        
    }
)



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

            // console.log(totalAmount)
  
            // Ajouter les éléments au DOM
            cartContainer.innerHTML += `
                <article class="cart__item" data-id="${item.id}" data-color="${selectedColor}">
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
    
        // // Boucle pour chaque article dans le panier pour calculer la quantité totale
        for (item of cart) {
         totalQuantity += item.quantity;
         }
    
        // Afficher le nombre total d'articles dans le panier
        cartQuantity.textContent = totalQuantity;
  }