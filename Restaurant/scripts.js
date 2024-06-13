var mybutton = document.getElementById("scrollToTopBtn");

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.documentElement.scrollTop = 0;
}

function retrieveSelections() {
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    const isChecked = localStorage.getItem(checkbox.value) === 'true';
    checkbox.checked = isChecked;
  })
}

function clearSelections() {
  localStorage.clear();
}

window.onload = function() {
  retrieveSelections();
  scrollFunction(); // Call scrollFunction on page load to handle initial display of scroll-to-top button
};

function showReceipt() {
  generateReceipt();
  document.querySelector('.floating-receipt').style.display = 'block';
}

function generateReceipt() {
  const receiptItems = document.getElementById('receipt-items');
  const totalElement = document.getElementById('total');
  let total = 0;

  receiptItems.innerHTML = '';

  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    if (checkbox.checked) {
      const dishName = checkbox.value;
      const price = getPriceForDish(dishName);
      total += price;

      const listItem = document.createElement('li');
      listItem.textContent = `${dishName} - ₱${price}`;
      receiptItems.appendChild(listItem);
    }
  });

  totalElement.textContent = `Total: ₱${total}`;
}

function getPriceForDish(dishName) {
  switch (dishName) {
    case 'Sisig':
      return 450;
    case 'Pork Sinigang':
      return 370;
    case 'Shirmp':
      return 399;
    case 'Lumpia-Sariwa':
      return 79;
    case 'Chop-Suey':
      return 450;
    case 'Pinakbet':
      return 299;
    case 'Chicharon-Bulaklak':
      return 150;
    case 'Lumpiang Shanghai':
      return 150;
    case 'Pork Siomai':
      return 100;
    case 'Pineapple Juice':
      return 99;
    case 'Buko Pandan':
      return 130;
    case 'Coffee':
      return 99;
    default:
      return 0;
  }
}

function acknowledgeOrder() {
  clearSelections();
  document.querySelector('.receipt').style.display = 'none';
  location.reload(); // Reload the page
}

function redirectToReceipt() {
  // Redirect to the Receipt.html page
  window.location.href = "Receipt.html";
}

document.getElementById('buyButton').addEventListener('click', showReceipt);
