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

// Fonction permettant de récuperer les éléments du produit sélectionné
addToCart.addEventListener("click", function(){
  const productColor = colors.value;
  const productQuantity = parseInt(chosen_quantity.value, 10);

  // Verifier si les infos nécessaires sont présentes
  if (!productId || !productColor || isNaN(productQuantity) || productQuantity <= 0){
    alert("Veuillez sélectionner une quantité valide et une couleur. ");
    return;
  }
  else{
    // Créer un objet produit avec les informations 
    const productDetails = {
      id : productId, 
      color : productColor, 
      quantity : productQuantity
    };

    // Verification pour voir si cela à fonctionner 
    console.log("Produit ajouté : ", productDetails);

    // Verifier si un panier existe déjà dans localStorage et Si aucun panier vide n'exsite pas, 
    // Initialse un tableau vide
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Vérifier si le panier existe déjà dans le panier 
    // existingProductIndex est une variable qui permet de déterminer l'exsitence des éléments
    const existingProductIndex = cart.findIndex(
      (item) => item.id === productDetails.id  && item.color === productDetails.color
    );

    if (existingProductIndex >= 0){
      //Si le produit existe déjà , augmenter la quantité 
      cart[existingProductIndex].quantity += productDetails.quantity;
    }
    else{
      cart.push(productDetails);
    }
  }

  // Sauvegarder le panier mis à jour dans localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Confirmer l'ajout à l'utilisateur 
  alert("Produit ajouté au panier avec succès !");
});


