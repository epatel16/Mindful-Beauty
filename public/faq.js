/**
 * NAME: Eshani Patel
 * DATE: June 9, 2023
 * Javascript file for the Mindful Beauty faq.html page.
 * Allows users to view FAQs using api.
 */

/**
 * Initializes the JS file in the runtime.
 */
(function () {
  "use strict";

  /**
   * Populates FAQ page with FAQs.
   * @param none
   * @returns none
   */
  function init() {
    getFAQ();
  }

  /**
   * Creates FAQ cards based on the information passes through the json object.
   * @param faqJson
   * @returns none
   */
  function createFAQ(faqJson) {
    let faq = gen("div");

    let question = gen("p");
    question.classList.add("question");
    question.textContent = faqJson.question;
    faq.appendChild(question);

    let answer = gen("p");
    answer.textContent = faqJson.answer;
    faq.appendChild(answer);

    id("faq-container").appendChild(faq);
  }

  /**
   * Uses api GET request to get FAQ json data and calls function to create FAQ cards.
   * @param none
   * @returns none
   */
  async function getFAQ() {
    id("faq-container").innerHTML = "";
    let url = "/all/?file=faq";
    let resp = await fetch(url);

    try {
      checkStatus(resp);
      let data = await resp.json();
      for (const key in data) {
        createFAQ(data[key]);
      }
    } catch {
      handleError("Unable to retrieve and display FAQ data.");
    }
  }
  init();
})();
