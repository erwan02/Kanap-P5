fetch("http://localhost:3000/api/products")
    .then(response => {
     if (!response.ok) {
    throw  Error("Erreur de communication avec le serveur");
  }
  return response.json();
})
  .then (function(products){
    for (let product of products){
        layoutProduct (product)}  
  }) 
 .catch(error => console.error("il y a un problème sur les produits "))

  //Recovery of the part to be modified
const items = document.querySelector("#items");


function layoutProduct (product){

     // Creation of elements to be integrated in html
     const anchor = document.createElement("a");
     const productImage = document.createElement("img");
     const article = document.createElement("article")
     const productName = document.createElement("h3");
     const productDescription = document.createElement("p");

     //add classes on the elements create
     productName.classList.add("productName");
     productDescription.classList.add("productDescription");

     //Integration into the DOM of the elements to create
     items.appendChild(anchor);
     anchor.appendChild(article);
     article.appendChild(productImage);
     article.appendChild(productName);
     article.appendChild(productDescription);

     //integration of the table 
     anchor.href = `./product.html?id=${product._id}`;
     productImage.src = product.imageUrl;
     productImage.alt = product.altTxt;
     productName.innerHTML = product.name;
     productDescription.innerHTML = product.description
    }