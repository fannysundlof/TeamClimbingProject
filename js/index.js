const buyBtn = document.querySelectorAll(".productinfo__card-btn");
const productsBtn = document.querySelector(".btn-products");
const productPrices = document.querySelectorAll(".productinfo__card-price");
const productPriceInner = productPrices[0].innerHTML;
const productPriceSplit = productPriceInner.split("kr");

productsBtn.addEventListener("click", function(){
  window.document.location = "#produkter";
})

for (let i = 0; i < buyBtn.length; i++) {
  buyBtn[i].addEventListener("click", () => {
    // Produktbild

    // ...Letar efter närmsta div-element till button
    const buyBtnDivParent = buyBtn[i].closest("div");
    // ...Selectar första child i köp-knappens parent.
    const productImgSrc = buyBtnDivParent.firstElementChild.src;

    // Produktpris
    const productPrices = document.querySelectorAll(".productinfo__card-price");
    const productPriceInner = productPrices[i].innerHTML;
    const productPriceSplit = productPriceInner.split("kr");
    const productPrice = productPriceSplit[0];
    
    //Produktnamn
    const productName = document.querySelectorAll(".productinfo__card-name")[i].innerHTML;

    //Produktbeskrivning
    const productDescAll = document.querySelectorAll(".productinfo__card-desc");
    const productDesc = productDescAll[i].innerHTML;


    // Sätter bild och produktens pris i localStorage.
    localStorage.setItem("product_img", productImgSrc);
    localStorage.setItem("product_price", productPrice);
    localStorage.setItem("product_name", productName);
    localStorage.setItem("product_desc", productDesc);

    // Länkas vidare till shoppingcart.
    window.document.location = "./shoppingcart.html";
    console.log(productPrice);
  });
}

