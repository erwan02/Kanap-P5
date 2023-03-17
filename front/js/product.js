const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get("id");

const getProductDetails = async () => {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${id}`);
    const product = await response.json();

    if (product.price < 1) {
      // Si le prix du produit est inférieur à 1, affiche un message d'erreur et retourne
      alert("Désolé, ce produit ne peut pas être acheté car son prix est inférieur à 1 €.");
      return;
    }

    const productImg = document.querySelector(".item__img");

    if (productImg) {
      const img = document.createElement("img");
      img.src = product.imageUrl;
      img.alt = product.altTxt;
      productImg.appendChild(img);
    }

    const productName = document.getElementById("title");
    const productPrice = document.getElementById("price");
    const productDescription = document.getElementById("description");

    if (productName && productPrice && productDescription) {
      productName.innerText = product.name;
      productPrice.innerText = `${product.price} €`;
      productDescription.innerText = product.description;
    }

    const colorSelect = document.getElementById("colors");

    
      for (const color of product.colors) {
        const option = document.createElement("option");
        option.value = color;
        option.innerText = color;
        colorSelect.appendChild(option);
      }
    

    const button = document.getElementById("addToCart");
    if (button) {
      button.addEventListener("click", (e) => {
        const color = document.getElementById("colors").value;
        let quantity = document.getElementById("quantity").value;
        if (color === null || color === "" || quantity === null || quantity === "" || quantity < 1 || quantity > 100 || !Number.isInteger(Number(quantity))) {
          alert("La quantité doit être un entier compris entre 1 et 100.");
          return;
        }

        const existingProduct = JSON.parse(localStorage.getItem(id));
        if (existingProduct && existingProduct.colors === color && existingProduct.modele === product.name) {
          alert("Vous avez déjà ajouté ce produit avec la même couleur et le même modèle au panier !");
          return;
        }

        let productPanier = {
          id: id,
          colors: color,
          quantity: quantity,
         /* price:Number (product.price),
          imageUrl: product.imageUrl,
          modele: product.name,
          description: product.description,*/
        };
        localStorage.setItem(id, JSON.stringify(productPanier));
        alert("Le produit a été ajouté au panier !");
        window.location.href = "cart.html";
      });
    }

  } catch (error) {
    console.error(error);
  }
};

getProductDetails();
