const nftCollections = [
  {
    id: 1,
    collection: 'Collection 1',
    name: 'NFT 1',
    price: '1.99',
    creator: 'Creator 1',
    description: 'NFT 1 description',
    image: 'NFT1.jpg'
  },
  {
    id: 2,
    collection: 'Collection 2',
    name: 'NFT 2',
    price: '5.99',
    creator: 'Creator 2',
    description: 'NFT 2 description',
    image: 'NFT2.jpg'
  },
  {
    id: 3,
    collection: 'Collection 3',
    name: 'NFT 3',
    price: '3.99',
    creator: 'Creator 3',
    description: 'NFT 3 description',
    image: 'NFT3.jpg'
  }
  // Add more NFT collections here
];

// Function to toggle between All NFT Collections and My NFT Collections
function toggleCollections(collectionType) {
  var allCollections = document.getElementById("allCollections");
  var myCollections = document.getElementById("myCollections");
  
  if (collectionType === "all") {
    allCollections.style.display = "block";
    myCollections.style.display = "none";
  } else if (collectionType === "my") {
    allCollections.style.display = "none";
    myCollections.style.display = "block";
  }
}

// Function to display My NFT Collections
function displayMyNFTCollections() {
  const myNFTList = document.getElementById('myNFTList');

  // Clear the list before adding the collections
  myNFTList.innerHTML = '';

  // Loop through the NFT collections and create an item for each
  nftCollections.forEach(collection => {
    const nftItem = createNFTItem(collection.id, collection.name, collection.price, collection.creator, collection.description, false);
    myNFTList.appendChild(nftItem);
  });
}

// Function to show NFT details in a modal
function showNFTDetails(nftId, title, name, price, creator, description) {
  var modal = document.getElementById("nftModal");
  var modalTitle = document.getElementById("modalTitle");
  var modalImage = document.getElementById("modalImage");
  var modalPrice = document.getElementById("modalPrice");
  var modalCreator = document.getElementById("modalCreator");
  var modalDescription = document.getElementById("modalDescription");
  
  modalTitle.textContent = title;
  modalImage.src = "NFT" + nftId + ".jpg";
  modalPrice.textContent = "Price: " + price + " ETH";
  modalCreator.textContent = "Created by: " + creator;
  modalDescription.textContent = description;
  
  modal.style.display = "block";
}

function hideNFTDetails() {
  var modal = document.getElementById("nftModal");
  modal.style.display = "none";
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('nftModal');
  modal.style.display = 'none';
}

function buyNFT() {
  var modal = document.getElementById("nftModal");
  var modalTitle = document.getElementById("modalTitle");
  var modalImage = document.getElementById("modalImage");
  var modalPrice = document.getElementById("modalPrice");

  // Get the NFT details
  var nftId = parseInt(modal.getAttribute("data-nft-id"));
  var title = modalTitle.textContent.trim();
  var image = modalImage.getAttribute("src");
  var price = modalPrice.textContent.trim().replace("Price: ", "");

  // Perform the purchase logic here
  if (price === "Sold") {
    console.log("This NFT has already been sold.");
  } else {
    // Move the NFT to "My NFT Collections" section
    var myCollections = document.getElementById("myCollections");
    var nftItem = createNFTItem(nftId, title, price, true);
    nftItem.querySelector("img").src = image; // Set the image source
    myCollections.appendChild(nftItem);

    // Update the NFT details in "All NFT Collections" section
    var nftItemAll = document.getElementById("nftItem-" + nftId);
    nftItemAll.querySelector(".price").textContent = "Sold";
    nftItemAll.classList.add("sold");

    // Disable the buy button
    var buyButton = modal.querySelector("#buyButton");
    buyButton.disabled = true;
    buyButton.textContent = "Sold";

    console.log("NFT purchased:", title);
  }

  // Close the modal
  modal.style.display = "none";

  // Update the displayed collections to "My NFT Collections"
  displayMyNFTCollections();
}

function createNFTItem(nftId, title, price, sellable) {
  var nftItem = document.createElement("div");
  nftItem.classList.add("nft-item");
  nftItem.id = "nftItem-" + nftId;
  nftItem.onclick = function() {
    showNFTDetails(nftId, title, price);
  };

  var nftImage = document.createElement("img");
  nftImage.src = "NFT" + nftId + ".jpg";
  nftImage.alt = title;
  nftItem.appendChild(nftImage);

  var nftDetails = document.createElement("div");
  nftDetails.classList.add("nft-details");
  nftItem.appendChild(nftDetails);

  var nftTitle = document.createElement("h4");
  nftTitle.textContent = title;
  nftDetails.appendChild(nftTitle);

  var nftPrice = document.createElement("p");
  nftPrice.classList.add("price");
  nftPrice.textContent = price + " ETH";
  nftDetails.appendChild(nftPrice);

  if (sellable) {
    var sellButton = document.createElement("button");
    sellButton.textContent = "Sell NFT";
    sellButton.onclick = function(event) {
      event.stopPropagation();
      console.log("Sell button clicked for NFT ID:", nftId);
    };
    nftDetails.appendChild(sellButton);
  }

  return nftItem;
}
