fetch("http://localhost:3000/api/order", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    contact: {
      firstName: "John",
      lastName: "Doe",
      address: "123 Rue Exemple",
      city: "Paris",
      email: "john.doe@example.com",
    },
    products: ["idProduit1", "idProduit2"],
  }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    return response.json();
  })
  .then((result) => {
    console.log("Commande réussie :", result);
  })
  .catch((error) => {
    console.error("Erreur lors de l'envoi :", error);
  });
