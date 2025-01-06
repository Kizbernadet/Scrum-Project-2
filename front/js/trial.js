// Liste pour stocker les promesses fetch
const fetchPromises = [];

// Assure-toi que allPrices est vide avant d'ajouter les prix
let allPrices = {};

// Vérifie si le panier est vide
if (cart.length === 0) {
  cartContainer.innerHTML = "<p>Votre panier est vide.</p>";
} else {
  // Parcours chaque produit du panier
  for (const item of cart) {
    // Construire l'URL pour chaque produit
    const productUrl = `http://localhost:3000/api/products/${item.id}`;

    // Ajouter chaque fetch à la liste des promesses
    const fetchPromise = fetch(productUrl)
      .then((response) => response.json())
      .then((data) => {
        // Remplir allPrices avec les données récupérées
        allPrices[item.id] = data.price;

        // Ajouter les articles au DOM
        cartContainer.innerHTML += `
          <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
            <div class="cart__item__img">
              <img src="${data.imageUrl}" alt="${data.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${data.name}</h2>
                <p>${item.color}</p>
                <p>${data.price} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : ${item.quantity}</p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>
        `;

        // Mettre à jour le total
        totalAmount += data.price * item.quantity;
        cartTotal.textContent = totalAmount;
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des produits :", error);
      });

    // Ajouter la promesse fetch dans le tableau
    fetchPromises.push(fetchPromise);
  }

  // Attendre que toutes les promesses soient terminées
  Promise.all(fetchPromises)
    .then(() => {
      console.log("Tous les fetch sont terminés !");
      console.log("Prix des produits :", allPrices);

      // Mise à jour finale du nombre total d'articles
      totalQuantity = cart.reduce((acc, item) => acc + parseInt(item.quantity), 0);
      cartQuantity.textContent = totalQuantity;
    })
    .catch((error) => {
      console.error("Erreur dans Promise.all :", error);
    });
}
