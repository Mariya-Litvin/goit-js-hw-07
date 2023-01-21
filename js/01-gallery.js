import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const listGallery = document.querySelector(".gallery");

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/></a></div>`;
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
  console.log(event.target.dataset.source);
  const instance = basicLightbox.create(
    `
    <img src="${event.target.dataset.source}" width="800" height="600">
`,
    {
      onShow: (instance) => {
        window.addEventListener("keydown", (event) => {
          if (event.code === "Escape") {
            instance.close();
          }
        });
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", (event) => {
          if (event.code === "Escape") {
            instance.close();
          }
        });
      },
    }
  );
  instance.show();
}

// function onEscPress(event) {
//   if (event.code === "Escape") {
//     instance.close();
//   }
// }
