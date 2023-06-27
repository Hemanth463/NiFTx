document.getElementById('banking-details-btn').addEventListener('click', function() {
  document.getElementById('bank-popup').style.display = 'block';
});

document.getElementById('close-bank-popup').addEventListener('click', function() {
  document.getElementById('bank-popup').style.display = 'none';
});

function showBankDetails(bankName) {
  document.getElementById('bank-popup').style.display = 'none';
  document.getElementById('bank-details-popup').style.display = 'block';
  document.getElementById('bank-name').textContent = bankName;
  
  // Fetch bank details using AJAX or any other method and update the following elements accordingly
  document.getElementById('account-number').textContent = '123456789';
  document.getElementById('account-type').textContent = 'Savings';
  document.getElementById('bank-balance').textContent = '$1000';
  document.getElementById('transaction-charges').textContent = '$10';
}

document.getElementById('close-bank-details-popup').addEventListener('click', function() {
  document.getElementById('bank-details-popup').style.display = 'none';
});

document.getElementById('transactions-btn').addEventListener('click', function() {
  document.getElementById('transactions-popup').style.display = 'block';
});

document.getElementById('close-transactions-popup').addEventListener('click', function() {
  document.getElementById('transactions-popup').style.display = 'none';
});

document.getElementById('logout-btn').addEventListener('click', function() {
  // Perform logout action, such as clearing session or redirecting to login page
});
