// Ajoute un écouteur d'événement pour intercepter la soumission du formulaire
orderForm.addEventListener("submit", (event) => {
  // Empêche l'action par défaut (rechargement de la page après soumission)
  event.preventDefault();

  // Récupère les données saisies dans le formulaire
  const firstname = document.querySelector("#firstName").value; // Prénom de l'utilisateur
  const lastname = document.querySelector("#lastName").value;   // Nom de l'utilisateur
  const address = document.querySelector("#address").value;     // Adresse de l'utilisateur
  const city = document.querySelector("#city").value;           // Ville de l'utilisateur
  const email = document.querySelector("#email").value;         // Email de l'utilisateur

  // Crée un tableau contenant les IDs des produits dans le panier
  const productsID = cart.map((item) => item.id); // `cart` contient tous les produits stockés dans le localStorage

  // Envoie une requête POST au back-end pour transmettre les données
  fetch("http://localhost:3000/api/products/order", { // URL de l'endpoint du back-end
    method: "POST", // Méthode HTTP utilisée pour envoyer les données
    headers: {
      "Content-Type": "application/json", // Indique que les données envoyées sont au format JSON
    },
    body: JSON.stringify({ // Convertit l'objet JavaScript en chaîne JSON pour l'envoyer
      contact: { // Objet contenant les informations de contact
        firstName: firstname,
        lastName: lastname,
        address: address,
        city: city,
        email: email,
      },
      products: productsID, // Tableau contenant les IDs des produits dans le panier
    }),
  })
    // Traite la réponse du serveur une fois reçue
    .then((response) => {
      if (!response.ok) { // Vérifie si la réponse HTTP est une erreur (code >= 400)
        throw new Error(`Erreur HTTP : ${response.status}`); // Lève une erreur si la réponse est invalide
      }
      return response.json(); // Convertit la réponse en JSON (promesse résolue)
    })
    .then((result) => {
      // Récupère l'ID de commande depuis la réponse du serveur
      const orderId = result.orderId;
      console.log("Commande réussie :", result); // Affiche la réponse dans la console

      // Redirige vers la page confirmation avec l'orderId dans l'URL
      window.location.href = `confirmation.html?orderId=${orderId}`;
    })
    .catch((error) => {
      // Affiche les erreurs dans la console en cas de problème réseau ou serveur
      console.error("Erreur lors de l'envoi :", error);
    });
});


// Confirmation
// Récupère les paramètres de l'URL (par exemple, ?orderId=123456)
const params = new URLSearchParams(window.location.search);

// Extrait la valeur associée à `orderId` depuis les paramètres
const orderId = params.get("orderId");

// Vérifie si un orderId a été trouvé dans l'URL
if (orderId) {
  // Insère l'orderId dans l'élément HTML prévu pour l'afficher
  document.querySelector("#orderId").textContent = orderId;
} else {
  // Affiche une erreur dans la console si aucun orderId n'a été trouvé
  console.error("Aucun ID de commande trouvé dans l'URL.");
}


// 