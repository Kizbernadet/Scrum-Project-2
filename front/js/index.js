const api_url = "http://localhost:3000/api/products";

// Sélectionnez le conteneur principal
const productContainer = document.getElementById("items");

// Récupérez les données de l'API
fetch(api_url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
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
  .catch((error) => {
    console.error("Erreur lors de la récupération des produits :", error);
  });
