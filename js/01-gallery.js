import { galleryItems } from "./gallery-items.js";

const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainer.addEventListener("click", onGalleryContainerClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `  <div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join("");
}

function onGalleryContainerClick(event) {
  event.preventDefault();

  const galleryImg = event.target.classList.contains("gallery__image");
  if (!galleryImg) {
    return;
  }

  const modal = basicLightbox.create(
    `<img
        class="gallery__image"
        src="${event.target.dataset.source}"
        alt="${event.target.description}"
      />`,
    {
      onShow: () => {
        document.addEventListener("keydown", modalCloseHandler);
      },
      onClose: () => {
        document.removeEventListener("keydown", modalCloseHandler);
      },
    }
  );
  modal.show();
  function modalCloseHandler(event) {
    if (event.code === "Escape") {
      modal.close();
    }
  }
}
