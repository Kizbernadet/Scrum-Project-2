// Les variables utilisées
// Variable de stockage de la localStorage 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Selectionne la balise total__price pour la gestion du montant total
const cartTotal = document.querySelector("#totalPrice");

// Sélectionne la balise cartQuantity
const cartQuantity = document.querySelector("#totalQuantity");

// Sélectionne la balise form pour la gestion du formulaire
const orderForm = document.querySelector(".cart__order__form");

// Variable pour stocker le montant total
let totalAmount = 0;
let totalQuantity = 0;

// Sélectionne la balise container dans la page cart.html
const cartContainer = document.querySelector("#cart__items");

// Liste pour stocker les promesses fetch
const fetchPromises = [];

// Dictionnaire pour stocker le prix des produits
let productPrices = {};

// Les fonctions Utilisées 
function itemQuantity(total, cart){
    total = 0;
    total = cart.reduce((acc, item) => acc + parseInt(item.quantity), 0);
    console.log(total);
    return total ;
}

// Gestion des Evenements 
// Action de supprimer un produit et de modifier la quantité
/**
 * cartContainer.addEventlistener écoute toutes les actions faites sur le panier et effectue les actions suivantes en fonction
 * de la balise cliquée, elle distingue chaque balise via le event.target ou par le type d'event récupéré
 * @param {Event} event correspond au type d'événement qui se produit sur le panier
 */
cartContainer.addEventListener(
    "click", (event) => {
        // event.target ne permet d'identifier la balise sur laquelle je clique
        const tag = event.target;

        // Récupère la balise article la plus proche de la balise cliquée
        const cartItem = event.target.closest(".cart__item");

        // Récupère l'attribut data-id et data-color de l'article le plus proche
        const id = cartItem.getAttribute("data-id");
        const color = cartItem.getAttribute("data-color");
        console.log(id, color)

        // Récupère le contenu actuel du localStorage
        let cart = JSON.parse(localStorage.getItem("cart"))


        if (tag.className === "deleteItem"){
            /**
             * Cette partie correspond à l'action de supprimer un produit du panier, l'event récupéré est le clic sur la balise de classe 
             * deleteItem, la méthode .remove() permet de supprimer cet élément du DOM, puis on récupère un nouveau panier
             * en filtrant cart via filter avec la condition item.id != id || item.color != color pour effacer l'élément supprimé du panier 
             * , cart est ensuite renvoyé dans le localStorage
             */

            // Supprime l'article le plus proche de la balise cliquée du DOM
            cartItem.remove()

            /**
             * Les variables product permet de récupérer les infos de l'élt supprimé dans le panier la méthode filtrer dans l'objectif que 
             * récupérer la valeur de sa quantité et son id puis ensuite on calcule le montan total de l'élément supprimé dans 
             * en faisant [quantity * price] , le prix est récupéré grâce au tableau productPrices[id] avec id et la quantité via 
             * product[0].quantity puis on soustrait le résultat du montant total des produits puis nouveau total montant est mise à jour.
             */
            let product = [];
            let deleteAmount  = 0;

            // Supprimer le produit éffacé via un trie puis récupère un tableau filtré
            product = cart.filter((item) => item.id === id && item.color === color);
            cart = cart.filter((item) => item.id != id || item.color != color);

            deleteAmount = product[0].quantity * productPrices[product[0].id];
            totalAmount -= deleteAmount;

            // Renvoie le tableau filtré dans le localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            // Mise à jour de la quantité et du montant total des produits
            cartQuantity.textContent  = itemQuantity(totalQuantity, cart);
            cartTotal.textContent = totalAmount;

        }

        else if (tag.className === 'itemQuantity'){
            // Récupère la nouvelle quantité de l'article
            const newQuantity = tag.value;

            /** Rôles des variables 
             * oldQuantity recupère la valeur de la quantité avant sa modification
             * newQuantity récupère la valeur de la nouvelle quantité 
             * amount_changed stocke la valeur qui sera ajouté ou enlevé du montant total des produits
             * quantity_changed stocke la diffence entre l'ancienne et la nouvelle quantité puis celle-ci est ajouté ou enlevé de la quantité total
             */
            let oldQuantity = 0;
            let amount_changed = 0;
            let quantity_changed = 0;


            /**
             * Modifie la valeur de la quantité du produit dans le panier grâce à son id 
             */
            for (item of cart){
                if (item.id == id && item.color == color){
                    oldQuantity = item.quantity;
                    item.quantity = parseInt(newQuantity, 10);
                }
            }

            // Renvoie le tableau filtré dans le localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            console.log(totalAmount)

            if (oldQuantity > newQuantity){
              quantity_changed = oldQuantity - newQuantity;

              // Mise à jour du montant total des produits 
              amount_changed = quantity_changed * productPrices[id];
              totalAmount -= amount_changed;

              // Mise à jour de la quantité totale de produits
              totalQuantity -= quantity_changed;
            }
            else if(oldQuantity === newQuantity){
              quantity_changed = 0;
            }
            else if(oldQuantity < newQuantity){
              quantity_changed = newQuantity - oldQuantity;

              // Mise à jour du montant total des produits 
              amount_changed = quantity_changed * productPrices[id];
              totalAmount += amount_changed;

              // Mise à jour de la quantité totale de produits
              totalQuantity += quantity_changed;
            }

            // Afficher le nombre total d'articles et le montant total dans le panier 
            cartQuantity.textContent = totalQuantity;
            cartTotal.textContent = totalAmount;

        }
            
    }
)

// Gestion du formulaire
orderForm.addEventListener("submit", (event) => {
  
  // Empêche l'envoi immédiat des données avant la vérification
  event.preventDefault();

  // Sélectionner les éléments 
  const user_firstname = document.querySelector("#firstName").value;
  const user_lastname = document.querySelector("#lastName").value;
  const user_address = document.querySelector("#address").value;
  const user_city = document.querySelector("#city").value;
  const user_email = document.querySelector("#email").value;

  let productsID = []

  /** Contact */
  // const contact = {
  //   firstName: user_firstname, 
  //   lastName: user_lastname, 
  //   address: user_address, 
  //   city: user_city, 
  //   email: user_email
  // };

  /**
   * Cette boucle me permet de stocker les id des produis depuis le cart vers un tableau qui sera envoyé dans ma requête 
   */
  for(item of cart){
    productsID.push(item.id)
  }

  console.log(productsID);
  /**
   * Cette requête avec fetch permet d'envoyer vers mon serveur les données du formulaire du client, un tableau avec les id des produits
   */

  /**
   * On utilise la méthode POST pour envoyer les données par notre requête
   */
  try {
    const response = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // userId: "12345", // Exemple d'utilisateur
        products: productsID, // Votre panier
        totalPrice: totalPrice,
        contact : {
          firstName: user_firstname, 
          lastName: user_lastname, 
          address: user_address, 
          city: user_city, 
          email: user_email
        },
      }),
    }).then(res=>{
      if (!res.ok) {
        throw new Error("Failed to create order");}
      return res.json()
    })
      .then(data=>{
        const orderId = data.orderId;

        console.log("Commande créée avec succès :", orderId);

      window.location.href = `./confirmation.html?orderId=${orderId}`;
      })

  } catch (error) {
    console.error("Erreur lors de la création de la commande :", error.message);
  }
})



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
        productPrices[item.id] = data.price;

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
      // Mise à jour finale du nombre total d'articles
      totalQuantity = cart.reduce((acc, item) => acc + parseInt(item.quantity), 0);
      cartQuantity.textContent = totalQuantity;
    })
    .catch((error) => {
      console.error("Erreur dans Promise.all :", error);
    });
}

