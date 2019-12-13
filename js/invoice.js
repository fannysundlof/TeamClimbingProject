function ShowDataonInvoice() {
  //section 1 - datum, fakturanr, förfallodatum
  const datum = document.querySelector(".invoice__num-date");
  const fakturanr = document.querySelector(".invoice__num-invnr");
  const ffdatum = document.querySelector(".invoice__num-ff");

  //section 2 - Adress, kontakt
  const fnamn = document.querySelector(".invoice__adress-fnamn");
  const gata = document.querySelector(".invoice__adress-gata");
  const postnr = document.querySelector(".invoice__adress-postnr");
  const pers = document.querySelector(".invoice__adress-pers");
  const tel = document.querySelector(".invoice__adress-tel");
  const mail = document.querySelector(".invoice__adress-mail");

  //section 3 - Produkt, tillval, meddelande
  const produkt = document.querySelector(".invoice__spec-produkt");
  const tillval = document.querySelector(".invoice__spec-tillval");
  const med = document.querySelector(".invoice__spec-med");
  const antal = document.querySelector(".invoice__spec-antal");

  //section 4 - Pris på produkt och tillval.
  const produktsumma = document.querySelector(".invoice__sum-produkt");
  const tillvalsumma = document.querySelector(".invoice__sum-tillval");
  const antalsumma = document.querySelector(".invoice__sum-antal");


  //section 5 - Total summa ex moms
  const totalsummaexmoms = document.querySelector(".invoice__total-exmoms");
  const totalmoms = document.querySelector(".invoice__total-moms");
  const totalsumma = document.querySelector(".invoice__total-total");

  //Dagens datum
  datum.innerHTML = new Date().toLocaleDateString();

  //Fakturanummer
  fakturanr.innerHTML = Math.floor(Math.random() * 900000) + 100000;

  // Förfallo datum 

  // ...förfallo datum (30dagar)
  const thisDate = new Date();
  thisDate.setDate(thisDate.getDate() + 30); 
  ffdatum.innerHTML = thisDate.toLocaleDateString();

  // Nollställer all tidigare info:
    produkt.innerHTML = "";
    produktsumma.innerHTML = "";

  // Hämta företagsinfo ifylld i varukorgen
  fnamn.innerHTML = localStorage.getItem("business_name");
  gata.innerHTML = localStorage.getItem("street");
  postnr.innerHTML = localStorage.getItem("zip");
  pers.innerHTML = localStorage.getItem("contact_name");
  tel.innerHTML = localStorage.getItem("contact_phone");
  mail.innerHTML = localStorage.getItem("contact_email");
  med.innerHTML = localStorage.getItem("message");

  // Hämta produktnamn + pris
  produkt.innerHTML = localStorage.getItem("product_name");
  produktsumma.innerHTML = localStorage.getItem("product_price") + " kr";

  // ... och antal personer + pris
  antal.innerHTML = localStorage.getItem("product_quantity") + " deltagare";
  antalsumma.innerHTML = localStorage.getItem("product_quantity_price") + " kr";

  // ... och tillvalsnamn + pris

  // Tillvalsnamn
  for (let i = 0; i < 3; i++) {
    
    if (localStorage.getItem(`addon${i+1}_name`)!=null) {
      const createLi = document.createElement("li");
      tillval.appendChild(createLi);
      createLi.innerHTML = localStorage.getItem(`addon${i+1}_name`);
    }
}
  // Tillvalspris
  for (let i = 0; i < 3; i++) {
    
    if (localStorage.getItem(`addon${i+1}_price`)!=null) {
      const createLi = document.createElement("li");
      tillvalsumma.appendChild(createLi);
      createLi.innerHTML = localStorage.getItem(`addon${i+1}_price`) + " kr";
    }
  }


  // Hämta totalsumma ex moms 
  totalsummaexmoms.innerHTML = `${localStorage.getItem("total")} kr`;

  // Specar moms
  totalmoms.innerHTML = `${localStorage.getItem("total")*0.25} kr`;


  // Räknar total ink moms.
  totalsumma.innerHTML = `${localStorage.getItem("total")*1.25} kr`;

}

document.addEventListener("DOMContentLoaded", function() {
  ShowDataonInvoice();
});

// En Tillbaka-knapp för att komma tillbaks till shoppingcart (bara för att göra det lättare för oss att gå fram och tillbaka)
const returnBtn = document.querySelector(".invoice__back");
returnBtn.addEventListener("click", tillbakaTillShoppingcart);

function tillbakaTillShoppingcart() {
  window.document.location = "./shoppingcart.html";
}

//Skriver ut hela sidan
const printbtn = document.querySelector(".invoice__print");

function Skrivut() {
  window.print();
  localStorage.clear();
}

printbtn.addEventListener("click", Skrivut);
