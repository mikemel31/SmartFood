function sliders() {
  const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    currentSlide = document.querySelector("#current"),
    totalSlides = document.querySelector("#total"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(slidesWrapper).width,
    slider = document.querySelector("div .offer__slider");

  let slideIndex = 1;
  let offset = 0;

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol");
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);
  const dots = [];

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.classList.add("dot");
    dot.setAttribute("data-slide-to", i + 1);
    indicators.append(dot);
    if (i == 0) {
      dot.style.opacity = "1";
    }
    dots.push(dot);
  }

  currentSlide.textContent = `0${slideIndex}`;
  totalSlides.textContent = `0${slides.length}`;

  next.addEventListener("click", () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
      currentSlide.textContent = `01`;
      slideIndex = 1;
    } else {
      offset += +width.slice(0, width.length - 2);
      currentSlide.textContent = `0${(slideIndex += 1)}`;
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    dots.forEach((dot) => (dot.style.opacity = "0.5"));
    dots[slideIndex - 1].style.opacity = "1";
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
      currentSlide.textContent = `04`;
      slideIndex = slides.length;
    } else {
      offset -= +width.slice(0, width.length - 2);
      currentSlide.textContent = `0${(slideIndex -= 1)}`;
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    dots.forEach((dot) => (dot.style.opacity = "0.5"));
    dots[slideIndex - 1].style.opacity = "1";
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;

      offset = +width.slice(0, width.length - 2) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      currentSlide.textContent = `0${(slideIndex -= 1)}`;

      dots.forEach((dot) => (dot.style.opacity = "0.5"));
      dot.style.opacity = "1";
    });
  });
}

export default sliders;
