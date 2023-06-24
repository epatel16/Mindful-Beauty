/**
 * NAME: Eshani Patel
 * DATE: June 9, 2023
 * Javascript file for the Mindful Beauty shop.html page.
 * Allows users to view, filter, and shop all items in the store.
 * Allos uses to view products individually and add them to cart.
 */

/**
 * Initializes the JS file in the runtime.
 */
(function () {
  "use strict";

  /**
   * Populates cart with all products. Initializes all buttons and drop downs with their
   * corresponding event listeners.
   *
   * @param none
   * @returns none
   */
  function init() {
    queryAll();

    const saleBtn = id("sale-btn");
    saleBtn.addEventListener("click", function () {
      queryFilter("sale");
    });

    const shopBtn = id("shop-btn");
    shopBtn.addEventListener("click", toggleView);

    const allProducts = id("all");
    allProducts.addEventListener("click", queryAll);

    const skincare = id("skincare");
    skincare.addEventListener("click", function () {
      queryFilter(this.id);
    });

    const makeup = id("makeup");
    makeup.addEventListener("click", function () {
      queryFilter(this.id);
    });

    const eyes = id("eyes");
    eyes.addEventListener("click", function () {
      queryFilter(this.id);
    });

    const lips = id("lips");
    lips.addEventListener("click", function () {
      queryFilter(this.id);
    });

    const face = id("face");
    face.addEventListener("click", function () {
      queryFilter(this.id);
    });
  }

  /**
   * Creates product cards based on the information passes through the json object browse
   * products page.
   * @param product
   * @returns none
   */
  function createCard(product) {
    let card = gen("article");
    card.classList.add("card");

    let title = gen("h3");
    title.textContent = product.brandName;

    let img = gen("img");
    img.src = product.image.src;
    img.alt = product.image.alt;

    let p1 = gen("p");
    p1.textContent = product.itemName;
    let p2 = gen("p");
    if(product.price != product.salePrice){

      let off = Math.round((1 - product.salePrice/product.price)*100);
      p2.textContent = "$" + product.salePrice + ".00 (" + off +  "% off! - originally $" +  product.price + ".00)";
    }
    else p2.textContent = "$" + product.price + ".00";

    let btn = gen("button");
    btn.textContent = "view";
    btn.id = product.id;
    btn.class = "indv";
    btn.addEventListener("click", goToProduct);

    card.appendChild(title);
    card.appendChild(img);
    card.appendChild(gen("hr"));
    card.appendChild(p1);
    card.appendChild(p2);
    card.appendChild(btn);
    id("item-container").appendChild(card);
  }

  /**
   * Creates product card based on the information passes through the json object
   * for an individual view.
   * @param product
   * @returns none
   */
  function createIndvCard(product) {
    let card = gen("article");
    card.classList.add("single");

    let img = gen("img");
    img.src = product.image.src;
    img.alt = product.image.alt;
    card.appendChild(img);

    let div = gen("div");
    div.id = "product-info";
    card.appendChild(div);

    let title = gen("h3");
    title.textContent = product.brandName;
    div.appendChild(title);

    let name = gen("h4");
    name.textContent = product.itemName;
    div.appendChild(name);

    let p1 = gen("p");
    if(product.price != product.salePrice){
      let off = Math.round((1 - product.salePrice/product.price)*100);
      p1.textContent = "$" + product.salePrice + ".00 (" + off +  "% off! - originally $" +  product.price + ".00)";
    }
    else p1.textContent = "$" + product.price + ".00";
    div.appendChild(p1);

    let p2 = gen("p");
    p2.textContent = product.description;
    div.appendChild(p2);

    let btn = gen("button");
    btn.textContent = "add to cart";
    btn.id = product.id;
    btn.addEventListener("click", addToCart);
    div.appendChild(btn);
    id("single-container").appendChild(card);
  }

  /**
   * Switches to individual view, clears the containr and displays the correct individual
   * project selected.
   * @returns none
   */
  function goToProduct() {
    toggleView();
    id("single-container").innerHTML = "";
    queryProduct(this.id);
  }

  /**
   * Toggles the hidden class to accces all-selection and individual.
   * @param none
   * @returns none
   */
  function toggleView() {
    qs("#all-section").classList.toggle("hidden");
    qs("#individual").classList.toggle("hidden");
  }

  /**
   * Adds one supply of a given item by using the POST request of the api
   * to edit the contents of the cart.
   * @param none
   * @returns none
   */
  async function addToCart() {
    let url = "/cart?type=add&body=" + this.id;
    let resp = await fetch(url, { method: "POST" });

    try {
      checkStatus(resp);
      let data = await resp.text();
    } catch {
      handleError("Unable to add to cart");
    }
  }

  /**
   * Uses api GET request to get products json data and calls function to create product cards.
   * @param none
   * @returns none
   */
  async function queryAll() {
    id("item-container").innerHTML = "";
    let url = "/all/?file=products";
    let resp = await fetch(url);

    try {
      checkStatus(resp);
      let data = await resp.json();
      for (const key in data) {
        createCard(data[key]);
      }
    } catch {
      handleError("Unable to retrieve and display product info.");
    }
  }

  /**
   * Uses api GET request to get a specfic product json data and calls function to create product card.
   * @param none
   * @returns none
   */
  async function queryProduct(product) {
    let url = "/productInfo/?product=" + product;
    let resp = await fetch(url);

    try {
      checkStatus(resp);
      let data = await resp.json();
      for (const key in data) {
        createIndvCard(data[key]);
      }
    } catch {
      handleError("Unable to retrieve and display product info.");
    }
  }

  /**
   * Uses api GET request to get filtered products json data and calls function to create product cards.
   * @param none
   * @returns none
   */
  async function queryFilter(filter) {
    id("item-container").innerHTML = "";
    let url = "/filter/?filter=" + filter;
    let resp = await fetch(url);

    try {
      checkStatus(resp);
      let data = await resp.json();

      for (const key in data) {
        createCard(data[key]);
      }
    } catch {
      handleError("Unable to retrieve and display product info.");
    }
  }

  init();
})();
