/**
 * NAME: Eshani Patel
 * DATE: June 9, 2023
 * Javascript file for the Mindful Beauty cart.html page.
 * Allows users to view and remove items in the cart.
 */

/**
 * Initializes the JS file in the runtime.
 */
(function () {
  "use strict";

  /**
   * Populates cart with all products in the cart
   * @param none
   * @returns none
   */
  function init() {
    queryAll();
  }

  /**
   * Creates product cards based on the information passes through the json object
   * with their given quantity for the cart.
   * @param product
   * @param quant
   * @returns none
   */
  function createCard(product, quant) {
    let card = gen("article");
    card.classList.add("cart-item");

    let img = gen("img");
    img.src = product.image.src;
    img.alt = product.image.alt;
    card.appendChild(img);

    let div = gen("div");
    div.classList.add("info");
    card.appendChild(div);

    let title = gen("h3");
    title.textContent = product.brandName;
    div.appendChild(title);

    let name = gen("h4");
    name.textContent = product.itemName;
    div.appendChild(name);

    let p1 = gen("p");
    p1.textContent = "(x " + quant + ") " + product.price;

    if(product.price != product.salePrice){
      p1.textContent =  "$" + product.salePrice*quant + ".00 ($" + product.salePrice + ".00 x " + quant + ") ";
    }
    else p1.textContent = "$" + product.price*quant + ".00 ($" + product.price + ".00 x " + quant + ") ";
    div.appendChild(p1);

    let btn = gen("button");
    btn.textContent = "remove one item";
    btn.id = product.id;
    btn.addEventListener("click", removeFromCart);
    div.appendChild(btn);
    id("cart-container").appendChild(card);
  }

  /**
   * Removes one supply of a given item by using the POST request of the api
   * to edit the contents of the cart.
   * @param none
   * @returns none
   */
  async function removeFromCart() {
    let url = "/cart?type=remove&body=" + this.id; // What's the diff btwn this and having body in the fetch call

    let resp = await fetch(url, { method: "POST" });

    try {
      checkStatus(resp);
      let data = await resp.text();
    } catch {
      handleError("Unable to add to cart");
    }
    queryAll();
  }

  /**
   * Uses api GET request to get cart json data, uses api GET request to get specific items from
   * the products json data, and calls function to create cart item cards.
   * @param none
   * @returns none
   */
  async function queryAll() {
    id("cart-container").innerHTML = "";
    let url = "/all/?file=cart";
    let resp = await fetch(url);

    try {
      checkStatus(resp);
      let data = await resp.json();
      for (const key in data) {
        url = "/productInfo/?product=" + key;
        resp = await fetch(url);
        try {
          checkStatus(resp);
          let product = await resp.json(); // returned data is the info for a single product
          for (const key2 in product) {
            createCard(product[key2], data[key]);
          }
        } catch {
          handleError("Unable to retrieve and display product info.");
        }
      }
    } catch {
      handleError("Unable to retrieve and display cart information.");
    }
  }

  init();
})();
