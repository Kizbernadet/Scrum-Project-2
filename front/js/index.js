/*
fetch("http://localhost:3000/api/products")
.then(response =>{
    return response.json();
})
.then(data =>{
    console.log(data);
})
.catch(error =>{
    console.log("Erreur :" + error);
})
 */


// Fonction principale pour charger les produits
async function loadProducts() {
    try {
      // Étape 1 : Envoyer une requête pour récupérer les produits depuis l'API
      const response = await fetch("https://api.example.com/products");
  
      // Vérification si la réponse est valide
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des produits");
      }
  
      // Étape 2 : Convertir la réponse en JSON
      const products = await response.json();

      console.log(products);git in
  
      // Étape 3 : Sélectionner le conteneur HTML où afficher les produits
      const productContainer = document.getElementById("items");
  
      // Étape 4 : Parcourir la liste des produits et générer les éléments HTML
      products.forEach(product => {
        // Créer un conteneur pour un produit
        const productDiv = document.createElement("div");
        productDiv.className = "product"; // Ajouter une classe CSS
  
        // Ajouter une image du produit
        const productImg = document.createElement("img");
        productImg.src = product.image; // URL de l'image
        productImg.alt = product.name; // Texte alternatif
  
        // Ajouter un titre pour le produit
        const productTitle = document.createElement("h3");
        productTitle.textContent = product.name; // Nom du produit
  
        // Ajouter l'image et le titre au conteneur produit
        productDiv.appendChild(productImg);
        productDiv.appendChild(productTitle);
  
        // Ajouter le conteneur produit au conteneur principal
        productContainer.appendChild(productDiv);
      });
    } catch (error) {
      // Étape 5 : Gérer les erreurs en affichant un message dans la console
      console.error("Erreur :", error);
  
      // Afficher un message sur la page
      const productContainer = document.getElementById("productContainer");
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Impossible de charger les produits. Veuillez réessayer plus tard.";
      productContainer.appendChild(errorMessage);
    }
  }
  
  // Appeler la fonction pour charger les produits
  loadProducts();
  