// Define the card component
class CardComponent extends HTMLElement {
  constructor() {
      super();

      const template = document.createElement('template');
      template.innerHTML = `
          <style>
              /* Styles for the card container */
              .card {
                  width: 300px;
                  margin: 0 auto;
                  border: 1px solid #ccc;
                  border-radius: 10px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  text-align: center;
                  padding: 20px;
              }

              /* Styles for the card header */
              .card-header {
                  font-size: 24px;
                  color: black;
              }

              /* Styles for the card image */
              .card-image {
                  max-width: 100%;
                  height: auto;
                  display: block;
                  margin: 0 auto;
              }

              /* Styles for the card text */
              .card-text {
                  font-size: 16px;
              }

              /* Styles for the hidden textbox */
              .hidden-textbox {
                  display: none;
              }
          </style>
          <div class="card">
              <h2 class="card-header"></h2>
              <div class="card-content">
                  <img class="card-image">
                  <p class="card-text"></p>
                  <div class="hidden-textbox">
                      <p></p>
                  </div>
              </div>
          </div>
      `;

      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));

      // Initialize variables
      this.card = this.shadowRoot.querySelector('.card');
      this.cardHeader = this.shadowRoot.querySelector('.card-header');
      this.cardImage = this.shadowRoot.querySelector('.card-image');
      this.cardText = this.shadowRoot.querySelector('.card-text');
      this.hiddenTextbox = this.shadowRoot.querySelector('.hidden-textbox');
  }

  connectedCallback() {
      // Set initial values
      this.cardHeader.textContent = this.getAttribute('header') || '';
      this.cardImage.src = this.getAttribute('image-url') || '';
      this.cardText.textContent = this.getAttribute('text') || '';
      this.hiddenTextbox.querySelector('p').textContent = this.getAttribute('hidden-text') || '';
  }
}

customElements.define('card-component', CardComponent);

// Your script for button actions
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".toggle-button");
  const duplicateButton = document.querySelector(".duplicate-button");
  const deleteButton = document.querySelector(".delete-button");
  const detailsButton = document.querySelector(".details-button");
  const renameButton = document.querySelector(".rename-button");

  let cardCounter = 1;

  toggleButton.addEventListener("click", () => {
      const card = document.querySelector('card-component');
      card.style.backgroundColor = card.style.backgroundColor === "lightpink" ? "" : "lightpink";
      card.cardHeader.style.color = card.cardHeader.style.color === "hotpink" ? "" : "hotpink";
  });

  duplicateButton.addEventListener("click", () => {
      const card = document.querySelector('card-component');
      const clonedCard = document.createElement('card-component');
      clonedCard.setAttribute('header', `Card Header ${++cardCounter}`);
      clonedCard.setAttribute('image-url', card.cardImage.src);
      clonedCard.setAttribute('text', card.cardText.textContent);
      clonedCard.setAttribute('hidden-text', card.hiddenTextbox.querySelector('p').textContent);
      document.body.appendChild(clonedCard);
  });

  deleteButton.addEventListener("click", () => {
      const cards = document.querySelectorAll('card-component');
      if (cards.length > 1) {
          cards[cards.length - 1].remove();
          cardCounter--;
      }
  });

  detailsButton.addEventListener("click", () => {
      const card = document.querySelector('card-component');
      card.hiddenTextbox.style.display = card.hiddenTextbox.style.display === "none" ? "block" : "none";
  });

  renameButton.addEventListener("click", () => {
      const card = document.querySelector('card-component');
      const newHeader = prompt("Enter a new header for the card:");
      if (newHeader !== null && newHeader !== "") {
          card.cardHeader.textContent = newHeader;
      }
  });
});
