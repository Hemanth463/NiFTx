const otpButton = document.getElementById('otp-button');
const otpInput = document.getElementById('otp');
const buyButton = document.getElementById('buy-button');

otpButton.addEventListener('click', generateOTP);
otpInput.addEventListener('input', checkOTP);
buyButton.addEventListener('click', buyNow);

let otpGenerated = false;
let realOTP = ''; // Variable to store the real OTP

function generateOTP() {
  realOTP = generateRealOTP(); // Generate the real OTP on the website
  alert(`Generated OTP: ${realOTP}`);
  otpGenerated = true;
  buyButton.removeAttribute('disabled'); // Enable the Buy Now button
}

function checkOTP() {
  const enteredOTP = otpInput.value.trim();
  if (enteredOTP === realOTP && otpGenerated) {
    buyButton.removeAttribute('disabled'); // Enable the Buy Now button if the entered OTP is correct
  } else {
    buyButton.setAttribute('disabled', true); // Disable the Buy Now button if the entered OTP is incorrect
  }
}

function buyNow() {
  alert('Congratulations! Your purchase is successful.');

  // Redirect to the cryptocurrency exchange page (wallet.html)
  window.location.href = 'wallet.html';
}

function generateRealOTP() {
  // Implement your logic to generate a real OTP here (e.g., using a random number generator)
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Prevent form submission
document.getElementById('payment-form').addEventListener('submit', function (event) {
  event.preventDefault();
});
