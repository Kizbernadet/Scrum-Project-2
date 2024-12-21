// Sélectionne la balise container dans la page cart.html
const cartContainer = document.querySelector("#cart__items");

// API URL
const api_url = "http://localhost:3000/api/products";

// Variable de stockage de la localStorage 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

console.log("LocalStorage : ", cart);


if (cart.length === 0) {
  cartContainer.innerHTML = "<p>Votre panier est vide.</p>";
} else {
    console.log(cart);

    for (item of cart){

        // Sélectionner la couleur choisie pour chaque produit et la quantité
        let selectedColor = item.color;
        let productQuantity = item.quantity;

        // Sélctionner l'url du produit 
        const productUrl = `http://localhost:3000/api/products/${item.id}`;

        fetch(productUrl)
        .then(response => response.json())
        .then((data) => {
            console.log(data);

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
        });
    }
}
