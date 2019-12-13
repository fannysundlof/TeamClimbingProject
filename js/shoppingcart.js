/* När hela sidan laddats färdigt: (DOMContentLoaded): */
document.addEventListener("DOMContentLoaded", ShowData());

/* Hämtar & visar data från vald produkt hos index.html. */
function ShowData() {
  // Produktbild:
  const product__img = document.querySelector(".product__img");
  product__img.src = localStorage.getItem("product_img");

  // Produktnamn:
  const overview_productName = document.querySelector(".product__header");
  overview_productName.innerHTML = localStorage.getItem("product_name");

  // Produktpris:
  const totalSpecProductPrice = document.querySelector(".total__product-price");
  totalSpecProductPrice.innerHTML = localStorage.getItem("product_price");

  // Produktbeskrivning:
  const overview__product__desc = document.querySelector(".product__info");
  overview__product__desc.innerHTML = localStorage.getItem("product_desc");

  /* Lägger produktpris i totalsumman */
  const totalSum = document.querySelector(".total__sum");
  totalSum.innerHTML = +localStorage.getItem("product_price");
}

//--------------------- Range Slider ----------------------//
const rangeSlider = document.querySelector(".slider__input");

// Nollställning av Slider:
const totalSum = document.querySelector(".total__sum");
const rangeSliderOutput = document.querySelector(".slider__qty");
const quantityValue = document.querySelector(".slider__output");
rangeSliderOutput.innerHTML = 1; // Antal deltagare = 1
quantityValue.innerHTML = 500; // Startpris för antal deltagare = 500kr
totalSum.innerHTML = +totalSum.innerHTML + +quantityValue.innerHTML;

// Lägger till antal personer + pris med hjälp av en range-slider.
rangeSlider.oninput = function() {
  const quantityValue = document.querySelector(".slider__output");
  const productQuantity = document.querySelector(".total__product-qty");
  const rangeSliderOutput = document.querySelector(".slider__qty");

  /* Visar antal personer + pris vid slider-container */
  rangeSliderOutput.innerHTML = this.value;
  quantityValue.innerHTML = this.value * 500; // 100kr per person

  /* Sätter pris + namn (antal deltagare) i total-specifikationen när man drar i slider-knappen. */
  // .. Via Mutation observer:

  const updateQtyObserver = new MutationObserver(updateQty);
  const config = { childList: true, subtree: true };

  function updateQty() {
    productQuantity.innerHTML = `${rangeSliderOutput.innerHTML} deltagare <span class="total__addon-price">${quantityValue.innerHTML}</span>`;
  }

  updateQtyObserver.observe(rangeSliderOutput, config);

  // Sätter local storage
  localStorage.setItem("product_quantity_price", quantityValue.innerHTML);
  localStorage.setItem("product_quantity", rangeSliderOutput.innerHTML);
};

//-------------------------- Tillval ---------------------//
const addonCheckbox = document.querySelectorAll(".addon__checkbox");
const addonTitleAll = document.querySelectorAll(".addon__title");
const addonDescAll = document.querySelectorAll(".addon__desc");
const addonPriceAll = document.querySelectorAll(".addon__price");
const optionsAddonAll = document.querySelectorAll(".options__addon");
//

/* Lägger in tillval i total-spec */
for (let i = 0; i < addonCheckbox.length; i++) {
  optionsAddonAll[i].addEventListener("click", () => {
    const createLi = document.createElement("li");
    const totalSpec = document.querySelector(".total__spec");
    const addonTitle = addonTitleAll[i].innerHTML;
    const addonDesc = addonDescAll[i].innerHTML;
    const rangeSliderOutput = document.querySelector(".slider__qty");
    let addonPrice =
      addonPriceAll[i].innerHTML * Number(rangeSliderOutput.innerHTML);

    if (!addonCheckbox[i].checked) {
      // Checkar in checkbox för att styla css etc.
      addonCheckbox[i].checked = true;
      // Skapa li-element som adderar addonTitle, -Desc och -Price.
      totalSpec.appendChild(createLi);
      // Lägger till id i <li> för att kunna ta bort i else-statement.
      createLi.setAttribute("id", [i]);

      // Set item = Tillvalets pris (t.ex addon1_price)
      localStorage.setItem(`addon${i + 1}_price`, addonPrice);
      // Set item = Tillvalets namn (t.ex addon1_name)
      localStorage.setItem(`addon${i + 1}_name`, addonTitle);
      // Set item = Tillvalets beskrivning (t.ex addon1_desc)
      localStorage.setItem(`addon${i + 1}_desc`, addonDesc);

      // Fyller i Tillvalets namn och pris (i en span).
      createLi.innerHTML = `${addonTitle} <span class="total__addon-price">${addonPrice}</span>`;

      // När vi ändra antal personer så ändras tillvalspriser (baserat på antal personer).

      const updateAddonPriceObserver = new MutationObserver(updateAddonPrice);
      const config = { childList: true, subtree: true };
      updateAddonPriceObserver.observe(rangeSliderOutput, config);

      function updateAddonPrice() {
        let addonPrice =
          addonPriceAll[i].innerHTML * rangeSliderOutput.innerHTML;
        createLi.innerHTML = `${addonTitle} <span class="total__addon-price">${addonPrice}</span>`;
        localStorage.setItem(`addon${i + 1}_price`, addonPrice);
      }

    } else {
      // Checkar av checkbox för att styla css etc.
      addonCheckbox[i].checked = false;
      // Tar bort elementet med samma ID som skapades i if.
      totalSpec.removeChild(document.getElementById([i]));

      // Tar bort itemets pris , namn och beskrivning så det ej hamnar i fakturan.
      localStorage.removeItem(`addon${i + 1}_price`);
      localStorage.removeItem(`addon${i + 1}_name`);
      localStorage.removeItem(`addon${i + 1}_desc`);
    }
  });
}

//----------------- Kunduppgifter form (checkout) ------------------//

// Gå vidare-knapp
const totalBtn = document.querySelector("#continue__btn");
totalBtn.addEventListener("click", ShowForm);

/* Visar + scrollar ner till .customerform ifall man fyllt i antal deltagare */
function ShowForm() {
  const formWrapper = document.querySelector(".customerform-wrapper");
  const SliderOutput = document.querySelector(".slider__qty");
  const warningTextBox = document.querySelector(".continue__warningtext");

  if (SliderOutput.innerText == "") {
    warningTextBox.innerHTML = "Vänligen välj antal personer.";
    return false;
  }
  document.querySelector("#customerform-section").scrollIntoView();
  formWrapper.style.display = "grid";
  warningTextBox.innerHTML = "";
}

// Köp-knappen (checkout)
const addBtn = document.querySelector("#checkout__btn");
addBtn.addEventListener("click", addInfo);

/* Skickar vidare info från formen där man fyller i företagsuppgifter */
function addInfo() {
  const businessNameValue = document.querySelector("#business_name").value;
  const streetValue = document.querySelector("#street").value;
  const zipValue = document.querySelector("#zip").value;
  const contactNameValue = document.querySelector("#contact_name").value;
  const contactPhoneValue = document.querySelector("#contact_phone").value;
  const contactEmailValue = document.querySelector("#contact_email").value;
  const messageValue = document.querySelector("#message").value;
  const totalSum = document.querySelector(".total__sum").innerHTML; //totalsumma

  // Varningstext: Kollar så att alla fält är ifyllda.
  const inputs = document.getElementsByClassName("customerform-input");
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      document.querySelector(".checkout__warningtext").innerHTML =
        "Du måste fylla i alla ovanstående fält.";
      return false;
    }
  }

  // Varningstext: Kollar ifall checkboxen för köpesvillkoren är icheckad:
  if (document.querySelector(".checkbox__input").checked) {
    // Lagrar ovanstående i localstorage.
    localStorage.setItem("business_name", businessNameValue);
    localStorage.setItem("street", streetValue);
    localStorage.setItem("zip", zipValue);
    localStorage.setItem("contact_name", contactNameValue);
    localStorage.setItem("contact_phone", contactPhoneValue);
    localStorage.setItem("contact_email", contactEmailValue);
    localStorage.setItem("message", messageValue);
    // + Totalsumma också
    localStorage.setItem("total", totalSum);
    // Länkar vidare till invoice.
    window.document.location = "../html/invoice.html";
  } else {
    document.querySelector(".checkout__warningtext").innerHTML =
      "Du måste läsa igenom våra köpvillkor innan du går vidare.";
  }
}

//----------------------- Totalsumman -------------------------//

/* Om något ändras i total__spec (pris-specifikationen innan totalsumman) = uppdatera totalsumman. */

// - Med hjälp av Mutationobserver:
// Sätt en target
const totalSpec = document.querySelector(".total__spec");

// Skapa en 'Mutationobserver' med en callback i param.
const updateTotalObserver = new MutationObserver(updateTotal);

// Våran callback
function updateTotal() {
  let spanSum = 0;
  const allaSpan = document.querySelectorAll(".total__addon-price");
  const totalSum = document.querySelector(".total__sum");
  const totalSpecProductPrice = document.querySelector(".total__product-price");

  for (let i = 0; i < allaSpan.length; i++) {
    spanSum += Number(allaSpan[i].innerHTML);
  }

  /* Lägger samman produktpris från spec med alla spans som har klassen ".total__product-price". */
  totalSum.innerHTML =
    Number(totalSpecProductPrice.innerHTML) + Number(spanSum);
}

// Sätt inställningar för observern.
const config = {
  childList: true,  // target's children observeras (Not in a creepy way.)
  subtree: true     // target's descendents observeras. (Också ganska creepy.)
};

// Observa våran target
updateTotalObserver.observe(totalSpec, config);
