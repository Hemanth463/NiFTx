const convertButton = document.getElementById('convert-button');
const buyButton = document.getElementById('buy-button');
const amountInput = document.getElementById('amount');
const ethAmountInput = document.getElementById('eth-amount');
const usdBalanceElement = document.getElementById('usd-balance');
const ethBalanceElement = document.getElementById('eth-balance');
const addUsdButton = document.getElementById('add-usd-button');

let usdBalance = parseFloat(localStorage.getItem('usdBalance')) || 1000;
let ethBalance = parseFloat(localStorage.getItem('ethBalance')) || 0;

usdBalanceElement.textContent = usdBalance.toFixed(2);
ethBalanceElement.textContent = ethBalance.toFixed(6);

amountInput.addEventListener('input', validateAmount);
addUsdButton.addEventListener('click', addUsdToWallet);

function validateAmount() {
  const amount = amountInput.value;
  if (amount > 0) {
    convertButton.removeAttribute('disabled');
  } else {
    convertButton.setAttribute('disabled', true);
  }
}

convertButton.addEventListener('click', convertToETH);
amountInput.addEventListener('input', checkETHAmount);
buyButton.addEventListener('click', buyNFTs);

let ethAmount = 0;

function convertToETH() {
  const amount = amountInput.value.trim();

  // Call the CoinGecko API to get the current exchange rate
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
    .then(response => response.json())
    .then(data => {
      const ethPrice = data.ethereum.usd;
      ethAmount = (amount / ethPrice).toFixed(6); // Convert USD to ETH

      ethAmountInput.value = ethAmount;
      buyButton.removeAttribute('disabled');
    })
    .catch(error => {
      console.error('Error converting to ETH:', error);
    });
}

function checkETHAmount() {
  const enteredAmount = amountInput.value.trim();
  if (enteredAmount !== '' && parseFloat(enteredAmount) > 0) {
    convertButton.removeAttribute('disabled');
  } else {
    convertButton.setAttribute('disabled', true);
    buyButton.setAttribute('disabled', true);
  }
}

function buyNFTs() {
  const usdAmount = parseFloat(amountInput.value);

  if (usdAmount > usdBalance) {
    alert("Insufficient USD balance. Please add more funds.");
    return;
  }

  // Perform the necessary steps to buy NFTs using the converted ETH amount
  // Deduct the USD amount from the balance
  usdBalance -= usdAmount;
  usdBalanceElement.textContent = usdBalance.toFixed(2);

  // Update the ETH balance
  ethBalance += parseFloat(ethAmount);
  ethBalanceElement.textContent = ethBalance.toFixed(6);

  // Store the updated balances in localStorage
  localStorage.setItem('usdBalance', usdBalance);
  localStorage.setItem('ethBalance', ethBalance);

  alert(`Congratulations! You have successfully bought ${ethAmount} ETH.`);

  // Redirect back to the NFT Collection page
  window.location.href = 'collection2.html';
}

function addUsdToWallet() {
  const additionalUsd = parseFloat(prompt('Enter the amount of USD to add:'));
  if (!isNaN(additionalUsd) && additionalUsd > 0) {
    usdBalance += additionalUsd;
    usdBalanceElement.textContent = usdBalance.toFixed(2);

    // Store the updated USD balance in localStorage
    localStorage.setItem('usdBalance', usdBalance);
  }
}

// Function to simulate buying ETH
function buyEth() {
  // Perform necessary form validation and data processing
  // Replace 'buyEthURL' with the actual URL to buy ETH
  fetch(buyEthURL, {
    method: 'POST',
    // Add necessary request data like payment details, user ID, etc.
  })
    .then(response => response.json())
    .then(data => {
      // ETH purchase successful
      // Update ETH balance on the page
      updateEthBalance(data.balance);
      // Redirect back to the NFT Collection page
      window.location.href = 'collection2.html';
    })
    .catch(error => {
      // Handle ETH purchase error
      console.error('Error purchasing ETH:', error);
    });
}

// Function to update ETH balance on the page
function updateEthBalance(balance) {
  const ethBalanceElement = document.getElementById('ethBalance');
  ethBalanceElement.textContent = balance.toFixed(2); // Update the ETH balance element with the new balance
}
