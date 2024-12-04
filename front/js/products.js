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

const newUrl = `http://localhost:3000/api/products/${productId}`;

// Vérifier que l'ID est présent
if (productId) {
  // Récupérer les données de l'API
  fetch(newUrl)
    .then((response) => response.json())
    .then((data) => {

      console.log(data)
      // Trouver le produit correspondant à l'ID
      const product = data;

      if (product) {
        // Construire l'élément HTML avec le modèle
        const productHTML = `
          <div class="item__content__titlePrice">
            <h1 id="title">${product.name}</h1>
            <p>Prix : <span id="price">${product.price}</span>€</p>
          </div>
          <div class="item__content__description">
            <p>${product.description}</p>
          </div>
        `;
        // Ajouter l'élément au conteneur
        productContainer.innerHTML = productHTML;
      } else {
        console.error("Produit non trouvé !");
        productContainer.innerHTML = `<p>Produit introuvable.</p>`;
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

