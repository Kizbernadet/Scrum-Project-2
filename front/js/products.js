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

// variables utilisées pour récupérer les balises d'emplacement  
// sur la page produit notamment l'image, titre, prix, description et couleurs
let productImageContainer = document.querySelector(".item__img");
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let description = document.querySelector("#description");
let colors = document.querySelector("#colors");

// Sélectionner le bouton Ajouter à la carte par son identifiant
let addToCart = document.querySelector("#addToCart");
let chosen_quantity = document.querySelector("#quantity");


const newUrl = `http://localhost:3000/api/products/${productId}`;


// Les fonctions Utilisées
/**
 * La fonction emptyCart() permet de créer un nouveau panier sous forme qui sera envoyer dans le localStorage
 */
function emptyCart(){
  // Ajouter un panier comme étant un tableau qui contiendra les differents sous forme d'objets 
  console.log("Panier Ajouté ....");
  let cart = localStorage.setItem("cart", JSON.stringify([]));
  return cart;
}

/**
 * La fonction addProduct() gère l'ajout de nouveau produit dans le panier 
 * @param {object} productToAdd Elle prend comme argument 
 */
function addProduct(productToAdd){
  // Recuperer le panier puis y ajouter le produit sélectionné
  let cart = JSON.parse(localStorage.getItem("cart"))

  console.log(cart, typeof cart);

  // Vérifier si le produit existe déjà dans le panier
  const existingProductIndex = cart.findIndex(
    (item) => item.id === productToAdd.id && item.color === productToAdd.color
  );

  console.log(existingProductIndex);

  if (existingProductIndex >= 0) {
    // Si le produit existe déjà, augmenter la quantité
    cart[existingProductIndex].quantity = 0
    cart[existingProductIndex].quantity += productToAdd.quantity;
  } else {
    // Sinon, ajouter le produit au panier
    cart.push(productToAdd);
  }

  console.log(cart);

  // Renvoyer le panier mis à jour dans le local Storage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Confirmer l'ajout au panier 
  alert("Produit ajouté au panier avec succès !");
}

//  Partie Principale du code 
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

          // forEach est une boucle qui permet de parcourir le tableau des couleurs disponibles pour chaque produit
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


// Creation d'un panier vide sous de tableau 
// Vérifier si un panier existe déjà dans localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || emptyCart();

console.log(typeof cart);

// Fonction permettant de récuperer les éléments du produit sélectionné
// Lorsqu'on clique sur le bouton ajouter au panier 
addToCart.addEventListener("click", function(){
  const productColor = colors.value;
  const productQuantity = parseInt(chosen_quantity.value, 10);

  // Vérifier que les informations sont valides
  if (!productColor || productQuantity <= 0 || isNaN(productQuantity)) {
    alert("Veuillez sélectionner une couleur et une quantité valide.");
    return; // Ne pas continuer si les données sont invalides
  }
  else{
    console.log("Les valeurs sont valides , objet récupéré ... !")
  }

  // Structure de l'objet produit
  const productToAdd = {
    id: productId, // Récupéré depuis l'URL
    color: productColor,
    quantity: productQuantity,
  };

  console.log("Objet Récupéré : ", productToAdd);

  addProduct(productToAdd);
});