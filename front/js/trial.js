// Gestion de l'ajout au panier
addToCart.addEventListener("click", function () {
    // Récupérer les informations du produit sélectionné
    const selectedColor = colors.value; // Couleur choisie dans la liste déroulante
    const selectedQuantity = parseInt(chosen_quantity.value, 10); // Quantité saisie dans le champ input
  
    // Vérifier que les informations sont valides
    if (!selectedColor || selectedQuantity <= 0 || isNaN(selectedQuantity)) {
      alert("Veuillez sélectionner une couleur et une quantité valide.");
      return; // Ne pas continuer si les données sont invalides
    }
  
    // Structure de l'objet produit
    const productToAdd = {
      id: productId, // Récupéré depuis l'URL
      color: selectedColor,
      quantity: selectedQuantity,
    };
  
    // Vérifier si un panier existe déjà dans localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Si aucun panier n'existe, initialise un tableau vide
  
    // Vérifier si le produit existe déjà dans le panier
    const existingProductIndex = cart.findIndex(
      (item) => item.id === productToAdd.id && item.color === productToAdd.color
    );
  
    if (existingProductIndex >= 0) {
      // Si le produit existe déjà, augmenter la quantité
      cart[existingProductIndex].quantity += productToAdd.quantity;
    } else {
      // Sinon, ajouter le produit au panier
      cart.push(productToAdd);
    }
  
    // Sauvegarder le panier mis à jour dans localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  
    // Confirmer l'ajout à l'utilisateur
    alert("Produit ajouté au panier avec succès !");
  });
  