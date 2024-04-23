const mainBody = document.querySelector(".mainBody");

const mainFoto = document.querySelector(".mainFoto");
const lightBoxSection = document.querySelector(".lightBox-section");
const closeModalBtn = document.querySelector(".closeThumbBtn");

const galleryItemsArray = document.querySelectorAll(".galleryItem");

const navbarBasketContainer = document.querySelector(".navbar-basketContainer");
const cartSection = document.querySelector(".cart-section");

const plusIcon = document.querySelector(".plus-icon");
const minusIcon = document.querySelector(".minus-icon");
const countElem = document.querySelector(".count");
const addToCartBtn = document.querySelector(".addToCartBtn");
const cartItemsContainer = document.querySelector(".cartItems-container");
const removeBtnIcon = document.querySelector(".removeBtnIcon");
const basketBadge = document.querySelector(".basket-badge");

const mobilemenuCloseBtn = document.querySelector(".mobile-menu-close");
const mobileMenu = document.querySelector(".mobile-menu");
const hamburgerIcon = document.querySelector(".hamburger-icon");
var itemsCount = 0;

var galleryFlag = 1;

mainBody.addEventListener("click", bodyclicked);

mobilemenuCloseBtn.addEventListener("click", closeMobileMenu);
hamburgerIcon.addEventListener("click", OpenMobileMenu);

mainFoto.addEventListener("click", showModal);
closeModalBtn.addEventListener("click", closeModal);

galleryItemsArray.forEach((item) => {
  item.addEventListener("click", (event) => selectgalleryItem(event));
});

navbarBasketContainer.addEventListener("click", openCart);
plusIcon.addEventListener("click", plusItem);
minusIcon.addEventListener("click", minusItem);
addToCartBtn.addEventListener("click", addToCart);

function bodyclicked(e) {
  // console.log(e.target);
  if (!cartSection.classList.contains("nodisplay")) {
    cartSection.classList.add("nodisplay");
  }
}

function showModal() {
  lightBoxSection.classList.add("displayed");
}
function closeModal() {
  lightBoxSection.classList.remove("displayed");
}
function selectgalleryItem(event) {
  mainFoto.src = `./images/image-${event.target.name}.jpg`;
  galleryItemsArray.forEach((item) => {
    item.classList.remove("activeGallery");
  });
  event.target.classList.add("activeGallery");
}

function openCart(event) {
  cartSection.classList.remove("nodisplay");
  event.stopPropagation();
}
function plusItem() {
  countElem.innerHTML++;
}

function minusItem() {
  if (countElem.innerHTML > 0) {
    countElem.innerHTML--;
  }
}
function addToCart() {
  if (countElem.innerHTML > 0) {
    itemsCount++;

    if (
      cartItemsContainer.firstChild.textContent.trim() === "Your cart is empty"
    ) {
      cartItemsContainer.innerHTML = "";
    }
    basketBadge.innerHTML = itemsCount;
    basketBadge.style.display = "inline";

    cartItemsContainer.insertAdjacentHTML(
      "beforeend",
      `
        <div class="cartItem">
        <img class="cartItem-image" src="./images/image-product-1-thumbnail.jpg"/>
        <div class="cartItem-text">
          <p>Fall limited edition sneakers</p>
          <p>$125*${countElem.innerHTML} <span class="cartPayAmount">$${
        countElem.innerHTML * 125
      }</span> </p>
        </div>
        <button class="cartItem-removeBtn"><img class="removeBtnIcon" onclick="removeItem(event)" src="./images/icon-delete.svg"/></button>
      </div>
        `
    );
    countElem.textContent = 0;
  }
}

function removeItem(event) {
  itemsCount--;
  event.target.parentElement.parentElement.remove();
  basketBadge.innerHTML = itemsCount;

  if (itemsCount == 0) {
    cartItemsContainer.innerHTML = "Your cart is empty";
    basketBadge.innerHTML = 0;
    basketBadge.style.display = "none";
  }
}

function closeMobileMenu() {
  mobileMenu.style.display = "none";
}
function OpenMobileMenu() {
  mobileMenu.style.display = "inline-block";
}

function prevGallery(e) {
  if (galleryFlag < 4) {
    galleryFlag++;
  } else {
    galleryFlag = 1;
  }
  document.querySelector(
    ".mainFoto-lightBox"
  ).src = `./images/image-product-${galleryFlag}.jpg`;
}
function nextGallery(e) {
  if (galleryFlag > 1) {
    galleryFlag--;
  } else {
    galleryFlag = 4;
  }
  document.querySelector(
    ".mainFoto-lightBox"
  ).src = `./images/image-product-${galleryFlag}.jpg`;
}
