// Affecter l'adresse de l'API dans une variable 
const api_url = "http://localhost:3000/api/products";

// Recupérer la classe du conteneur principal
// Sélectionnez le conteneur principal
const productContainer = document.getElementById("items");

// Récupérez les données de l'API
fetch(api_url)
  .then((response) => response.json())
  .then((data) => {
    // Parcourez chaque produit et créez le HTML correspondant
    data.forEach((product) => {
      // Construire l'élément HTML avec le modèle
      const productHTML = `
        <a href="./product.html?id=${product._id}">
          <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
          </article>
        </a>
      `;
      // Ajouter l'élément au conteneur
      productContainer.innerHTML += productHTML;
    });
  })
  // Code à exécuter en cas de la lever d'une erreur
  .catch((error) => {
    console.error("Erreur lors de la récupération des produits :", error);
  });