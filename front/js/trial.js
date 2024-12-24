for (item of cart) {
    const productUrl = `http://localhost:3000/api/products/${item.id}`;
    
    fetch(productUrl)
      .then(response => response.json())
      .then((data) => {
        let productQuantity = item.quantity;
        let productPrice = data.price * productQuantity;
        
        // Ajoute au total
        totalAmount += productPrice;
        totalQuantity += productQuantity;
        
        // Ajoute l'élément au DOM
        cartContainer.innerHTML += `
          <article class="cart__item" data-id="${data.id}" data-color="${item.color}">
            <div class="cart__item__img">
              <img src="${data.imageUrl}" alt="${data.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${data.name}</h2>
                <p>${item.color}</p>
                <p>${data.price} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : ${productQuantity}</p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productQuantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>
        `;
        
        // Mettre à jour les totaux dans le DOM
        cartTotal.textContent = totalAmount;
        cartQuantity.textContent = totalQuantity;
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des produits :", error);
      });
  }
  