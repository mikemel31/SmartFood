function modalWindowOpen(modalSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector)
  modalWindow.classList.remove("hide");
  modalWindow.classList.add("show");
  document.body.style.overflow = "hidden";
  if (modalTimerId) {
    clearInterval(modalTimerId)
  };
}

function modalWindowClose(modalSelector) {
  const modalWindow = document.querySelector(modalSelector)
  modalWindow.classList.remove("show");
  modalWindow.classList.add("hide");
  document.body.style.overflow = "";
}

function modal(modalSelector, triggerSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector),
    openModal = document.querySelectorAll(triggerSelector);

  openModal.forEach((btn) => {
    btn.addEventListener("click", () => modalWindowOpen(modalSelector, modalTimerId));
  });

  modalWindow.addEventListener("click", (e) => {
    if (
      e.target === modalWindow ||
      e.target.getAttribute("data-modalclose") == ""
    ) {
      modalWindowClose(modalSelector);
      window.removeEventListener("scroll", showModalByScroll);
    }
  });

  window.addEventListener("scroll", showModalByScroll);

  function showModalByScroll() {
    if (window.scrollY + window.innerHeight + 2 >= document.body.scrollHeight) {
      modalWindowOpen(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
}
export default modal;
export { modalWindowOpen, modalWindowClose };
