async function getProductById (idProduct){
  let res = await fetch("http://localhost:3000/api/products/" + idProduct)
   return res.json();
}

async function ReCard(){


let productCart = localStorage.getItem("productPanier");

//on vide la section avant de bouclé sur notre DOM
    let sectionItem = document.getElementById("cart__items");
    sectionItem.innerHTML = "";
//si local est null alors il est vide
    if (productCart !== null) {
        productCart = JSON.parse(productCart);
    let numberTotalQuantity = 0;
    let totalPrice = 0;
    }

//rappel des produits 
for (let productOrder of productCart) {
  let item = await getProductById(productOrder.product_id);

  console.log(item,"tets")
  
  // numberTotalQuantity += productOrder.product_quantity;
  // totalPrice += (productOrder.product_quantity * item.price);
  // addArticle(item, productOrder);
}
}
ReCard()
/*

const cart = [];
const cartItemsContainer = document.querySelector("#cart__items");
for (let i = 0; i < localStorage.length; i++) {

  console.log()
    const item = JSON.parse(localStorage.getItem(localStorage.key(i)));
    cart.push(item);
}*/
/*
cart.forEach((item) => {
    const article = document.createElement("article");
    article.classList.add("cart__item");
    article.setAttribute("data-id", item.id);

    const divImg = document.createElement("div");
    divImg.classList.add("cart__item__img");

    const img = document.createElement("img");
    img.setAttribute("src", item.imageUrl);
    img.setAttribute("alt", item.modele);
    divImg.appendChild(img);

    const divContent = document.createElement("div");
    divContent.classList.add("cart__item__content");

    const divTitlePrice = document.createElement("div");
    divTitlePrice.classList.add("cart__item__content__titlePrice");

    const h2 = document.createElement("h2");
    h2.innerText = item.modele;
    divTitlePrice.appendChild(h2);

    const pPrice = document.createElement("p");
    pPrice.innerText = item.price;
    divTitlePrice.appendChild(pPrice);

    divContent.appendChild(divTitlePrice);

    const divSettings = document.createElement("div");
    divSettings.classList.add("cart__item__content__settings");

    const divQuantity = document.createElement("div");
    divQuantity.classList.add("cart__item__content__settings__quantity");

    const pQuantity = document.createElement("p");
    pQuantity.innerText = "Qté : ";
    divQuantity.appendChild(pQuantity);

    const inputQuantity = document.createElement("input");
    inputQuantity.setAttribute("type", "number");
    inputQuantity.classList.add("itemQuantity");
    inputQuantity.setAttribute("name", "itemQuantity");
    inputQuantity.setAttribute("min", "1");
    inputQuantity.setAttribute("max", "100");
    inputQuantity.setAttribute("value", item.quantity.toString());
    inputQuantity.addEventListener("change", (event) => {
      let newQuantity = parseInt(event.target.value);
      // Vérifier si le nouveau nombre est positif
      if (newQuantity <= 0 || isNaN(newQuantity)) {
          newQuantity = 1;
      }
      item.quantity = newQuantity;
      localStorage.setItem(item.id, JSON.stringify(item));
      updateCartTotal();
  });

    divQuantity.appendChild(inputQuantity);

    divSettings.appendChild(divQuantity);

    const divDelete = document.createElement("div");
    divDelete.classList.add("cart__item__content__settings__delete");

    const pDelete = document.createElement("p");
    pDelete.classList.add("deleteItem");
    pDelete.innerText = "Supprimer";
    pDelete.addEventListener("click", (event) => {
        const itemId = event.target.closest("article").getAttribute("data-id");
        localStorage.removeItem(itemId);
        event.target.closest("article").remove();
        updateCartTotal();
    });

    divDelete.appendChild(pDelete);

    divSettings.appendChild(divDelete);

    divContent.appendChild(divSettings);

    article.appendChild(divImg);
    article.appendChild(divContent);

    cartItemsContainer.appendChild(article);
});
*/
function updateCartTotal() {
    const cartItems = document.querySelectorAll(".cart__item");
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
        const cartItem = cartItems[i];
        const priceElement = cartItem.querySelector(".cart__item__content__titlePrice p");
        const quantityElement = cartItem.querySelector(".itemQuantity");
        const price = parseFloat(priceElement.innerText);
        const quantity = quantityElement.value;
        total += price * quantity;
    }
    const totalElement = document.querySelector("#totalPrice");
    totalElement.innerText = "Total : " + total.toFixed(2) ;
}

updateCartTotal();





/*******************Cart__order*********************/

let firstName = document.getElementById("firstName");
let regexName = /^[a-z ,.'-]+$/i;
let errorFirstName = document.getElementById("firstNameErrorMsg");

let lastName = document.getElementById("lastName");
let errorLastName = document.getElementById("lastNameErrorMsg");

let address = document.getElementById("address");
let regexAddress = /^[a-zA-Z0-9\s,'-]*$/;
let errorAddress = document.getElementById("addressErrorMsg");

let city = document.getElementById("city");
let regexCity =
  /^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/;
let errorCity = document.getElementById("cityErrorMsg");

let email = document.getElementById("email");
let regexEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
let errorEmail = document.getElementById("emailErrorMsg");

let order = document.getElementById("order");

// évènements en input afin d'indiquer un message d'erreur si un mauvais caractère est utilisé
firstName.addEventListener("input", (e) => {
  e.preventDefault();
  if (regexName.test(firstName.value) == false) {
    errorFirstName.innerHTML = "Prénom est incorrect";
  } else {
    errorFirstName.innerHTML = "";
  }
});

lastName.addEventListener("input", (e) => {
  e.preventDefault();
  if (regexName.test(lastName.value) == false) {
    errorLastName.innerHTML = "Nom est incorrect";
  } else {
    errorLastName.innerHTML = "";
  }
});

address.addEventListener("input", (e) => {
  e.preventDefault();
  if (regexAddress.test(address.value) == false) {
    errorAddress.innerHTML = "Addresse est incorrect";
  } else {
    errorAddress.innerHTML = "";
  }
});

city.addEventListener("input", (e) => {
  e.preventDefault();
  if (regexCity.test(city.value) == false) {
    errorCity.innerHTML = "Ville incorrect";
  } else {
    errorCity.innerHTML = "";
  }
});

email.addEventListener("input", (e) => {
  e.preventDefault();
  if (regexEmail.test(email.value) == false) {
    errorEmail.innerHTML = "Email incorrect";
  } else {
    errorEmail.innerHTML = "";
  }
});

// évènement au clic du bouton commender
order.addEventListener("click", (e) => {
  e.preventDefault();
  // création d'un tableau afin de récuperer les données de l'utilisateur
  let contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };
  // si des données de l'utilisateur sont manquantes,
  // un message d'erreur apparait
  if (
    firstName.value === "" ||
    lastName.value === "" ||
    address.value === "" ||
    city.value === "" ||
    email.value === ""
  ) {
    window.confirm("champs manquant !!");
    // la page ne se réactualise pas
   
  } else {
    let products = [];

    // boucle du tableau du localStorage afin de récupérer les id et les intégrer dans mon tableau products
    cart.forEach((order) => {
      products.push(order.id);
    });

    let pageOrder = { contact, products };

    // je fais appel à l'api order pour envoyer mes tableaux
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(pageOrder),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        window.location.href = `confirmation.html?orderId=${data.orderId}`;
      })
      .catch((error) => {
        alert(error);
      });
  }
});
