import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const listGallery = document.querySelector(".gallery");

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" href="${original}"><img class="gallery__image" src="${preview}" alt="${description}"/></a>`;
    })
    .join("");
}

const galleryMarkup = createGalleryMarkup(galleryItems);
listGallery.insertAdjacentHTML("beforeend", galleryMarkup);

listGallery.addEventListener("click", onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
}
const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionPosition: "bottom",
  captionDelay: 250,
});
