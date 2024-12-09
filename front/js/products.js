// Récupérer l'URL actuelle
const currentUrl = window.location.href;
console.log("URL actuelle :", currentUrl);

// Créer un objet URL pour manipuler l'URL
const url = new URL(currentUrl);

// Extraire le paramètre "id" de l'URL
const productId = url.searchParams.get("id");
console.log("ID récupéré :", productId);

// Sélectionner le conteneur principal
const productContainer = document.querySelector(".item");

// usable variables
let productImageContainer = document.querySelector(".item__img");
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let description = document.querySelector("#description");
let colors = document.querySelector("#colors");

let addToCart = document.querySelector("#addToCart");
let chosen_quantity = document.querySelector("#quantity");


const newUrl = `http://localhost:3000/api/products/${productId}`;

// Vérifier que l'ID est présent
if (productId) {
  // Récupérer les données de l'API
  fetch(newUrl)
    .then((response) => response.json())
    .then((data) => {
        title.textContent = data.name;
        price.textContent = data.price;
        description.textContent = data.description;
        productImageContainer.innerHTML=`
          <img src="${data.imageUrl}" alt="${data.altTxt}">
        `
        // Remplir les options de couleurs
        // Cette condition permet de vérifier si le tableau existe (data.colors) et (s'il n'est pas vide data.length > 0)
        if (data.colors && data.colors.length > 0) {
          data.colors.forEach((color) => {
            const option = document.createElement("option");
            option.value = color;
            option.textContent = color;
            colors.appendChild(option);
          });
        } else {

          console.warn("Aucune couleur disponible pour ce produit.");
        }
        })
    .catch((error) => {
      console.error("Erreur lors de la récupération des produits :", error);
      productContainer.innerHTML = `<p>Erreur lors du chargement du produit.</p>`;
    });
} else {
  console.error("Aucun ID spécifié dans l'URL !");
  productContainer.innerHTML = `<p>Aucun produit sélectionné.</p>`;
}