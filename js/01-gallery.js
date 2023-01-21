// Завдання 1 - галерея зображень

// Створи галерею з можливістю кліку по її елементах і перегляду
//  повнорозмірного зображення у модальному вікні.
//  Подивися демо відео роботи галереї.

// Виконуй це завдання у файлах 01-gallery.html і 01-gallery.js. Розбий його на декілька підзавдань:

// 1. Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// 2. Реалізація делегування на div.gallery і отримання url великого зображення.
// 3. Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// 4. Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// 5. Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.

// Посилання на оригінальне зображення повинно зберігатися в data - атрибуті
//  source на елементі < img >, і вказуватися в href посилання.
//  Не додавай інші HTML теги або CSS класи, крім тих, що містяться
//   в цьому шаблоні.

// Зверни увагу на те, що зображення обгорнуте посиланням,
//   отже по кліку за замовчуванням користувач буде перенаправлений
//   на іншу сторінку.Заборони цю поведінку за замовчуванням.

//   Додай закриття модального вікна після натискання клавіші Escape.
//    Зроби так, щоб прослуховування клавіатури було тільки доти,
//   доки відкрите модальне вікно.Бібліотека basicLightbox містить
//    метод для програмного закриття модального вікна.

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
        window.addEventListener("keydown", onEscPress);
      },
      onClose: (instance) => {
        window.removeEventListener("keydown", onEscPress);
      },
    }
  );
  instance.show();

  function onEscPress(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
}
