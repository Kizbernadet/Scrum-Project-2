// Récupère les paramètres de l'URL (par exemple, ?orderId=123456)
const params = new URLSearchParams(window.location.search);

// Extrait la valeur associée à `orderId` depuis les paramètres
const orderId = params.get("orderId");
console.log("orderId", typeof orderId)

// Vérifie si un orderId a été trouvé dans l'URL
if (orderId) {
  // Insère l'orderId dans l'élément HTML prévu pour l'afficher
  document.querySelector("#orderId").textContent = orderId;
} else {
  // Affiche une erreur dans la console si aucun orderId n'a été trouvé
  console.error("Aucun ID de commande trouvé dans l'URL.");
}
