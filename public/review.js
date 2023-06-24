/**
 * NAME: Eshani Patel
 * DATE: June 9, 2023
 * Javascript file for the Mindful Beauty review.html page.
 * Allows users to submit feedback to be recorded by API.
 */

/**
 * Initializes the JS file in the runtime.
 */
(function () {
  "use strict";

  const TIMER_DELAY = 2000;

  /**
   * Creates button for feedback-btn adds its event listeners
   * @param none
   * @returns none
   */
  function init() {
    const feedbackBtn = id("feedback-btn");
    feedbackBtn.addEventListener("click", readForm);
  }

  /**
   * Reads in the user input into the form and sends it through a post
   * request, displaying a message if the review was received or if there was an error.
   * @param none
   * @returns none
   */
  async function readForm() {
    let feedback = id("feedback").value;
    let url = "/feedback?body=" + feedback;

    let resp = await fetch(url, { method: "POST" });

    try {
      checkStatus(resp);
      let data = await resp.text();
      id("instruct").textContent = data;
      id("feedback").value = "";
      setTimeout(() => (id("instruct").textContent = "Please write a customer review here to help us improve your experience!"), TIMER_DELAY);
    } catch {
      handleError("Unable to submit form");
    }
  }

  init();
})();
