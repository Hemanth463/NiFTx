'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header active
 */

const header = document.querySelector("[data-header]");

const activeHeader = function () {
  if (window.scrollY > 300) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeHeader);



/**
 * toggle active on add to fav
 */

const addToFavBtns = document.querySelectorAll("[data-add-to-fav]");

const toggleActive = function () {
  this.classList.toggle("active");
}

addEventOnElem(addToFavBtns, "click", toggleActive);



/**
 * scroll revreal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 1.5) {
      sections[i].classList.add("active");
    } else {
      sections[i].classList.remove("active");
    }
  }
}






scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  const yOffset = -50; // Adjust this value to fine-tune the scroll position
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({ top: y, behavior: 'smooth' });
}







 // Function to fetch and update the coin data
 async function updateCoinData() {
  try {
    // Fetch the market data for the coins from the CoinGecko API
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,binancecoin');
    const data = await response.json();

    // Update the coin data in the HTML elements
    const coinElements = document.querySelectorAll('.trend-card');

    coinElements.forEach((coinElement, index) => {
      const cardValueElement = coinElement.querySelector('.card-value');
      const currentPriceElement = coinElement.querySelector('.current-price');
      const percentageChangeElement = coinElement.querySelector('.badge');

      // Update the card value
      cardValueElement.innerText = `${data[index].symbol.toUpperCase()} ${data[index].current_price.toFixed(2)}`;

      // Update the current price
      currentPriceElement.innerText = data[index].current_price.toLocaleString();

      // Update the percentage change
      const percentageChange = data[index].price_change_percentage_24h;
      percentageChangeElement.innerText = `${percentageChange.toFixed(2)}%`;
      percentageChangeElement.classList.add(percentageChange > 0 ? 'green' : 'red');
    });
  } catch (error) {
    console.error('Error fetching coin data:', error);
  }
}

// Call the updateCoinData function to initially fetch and update the coin data
updateCoinData();

// Update the coin data every specified interval (e.g., every 5 seconds)
setInterval(updateCoinData, 5000);
