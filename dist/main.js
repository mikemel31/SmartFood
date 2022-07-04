/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const calc = function () {
  const result = document.querySelector('.calculating__result span');
  let sex, height, weight, age, ratio;
  sex = 'female';
  ratio = 1.375;

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = '';
      return;
    }

    if (sex === 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight * 0.454 + 3.1 * height * 2.54 - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight * 0.454 + 4.8 * height * 2.54 - 5.7 * age) * ratio);
    }
  }

  const activity = document.querySelector('.calculating__choose_big');
  const activityList = activity.querySelectorAll(`.calculating__choose-item`);

  function getRatio(e) {
    ratio = e.target.getAttribute('data-ratio');
    activityList.forEach(activity => activity.classList.remove('calculating__choose-item_active'));
    e.target.classList.add('calculating__choose-item_active');
    calcTotal();
  }

  activityList.forEach(act => act.addEventListener('click', e => getRatio(e)));
  document.querySelector('#height').addEventListener('change', e => {
    height = e.target.value;
    calcTotal();
  });
  const genderSlider = document.querySelector('#gender'),
        genderChoiceList = genderSlider.querySelectorAll('.calculating__choose-item');
  genderChoiceList.forEach(gender => gender.addEventListener('click', e => getGender(e)));

  function getGender(e) {
    sex = e.target.id;
    genderChoiceList.forEach(gender => gender.classList.remove('calculating__choose-item_active'));
    e.target.classList.add('calculating__choose-item_active');
    calcTotal();
  }

  const ageField = document.querySelector('#age');
  ageField.addEventListener('change', e => {
    age = +e.target.value;
    calcTotal();
  });
  const weightField = document.querySelector('#weight');
  weightField.addEventListener('change', e => {
    weight = +e.target.value;
    calcTotal();
  });
  calcTotal();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/services */ "./js/modules/services/services.js");


function cards() {
  class MenuCard {
    constructor(src, alt, name, description, price, parentSelector) {
      this.name = name;
      this.description = description;
      this.price = price;
      this.src = src;
      this.alt = alt;
      this.parent = document.querySelector(parentSelector);

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
    }

    render() {
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.classes = "menu__item";
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.name}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Price:</div>
                <div class="menu__item-total"><span>${this.price}</span> USD/day</div>
            </div>`;
      this.parent.append(element);
    }

  }

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResourses)("http://localhost:3000/menu").then(data => data.forEach(_ref => {
    let {
      img,
      altimg,
      title,
      description,
      price
    } = _ref;
    return new MenuCard(img, altimg, title, description, price, ".menu .container").render();
  }));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/services */ "./js/modules/services/services.js");



const forms = function (modalSelector) {
  const forms = document.querySelectorAll("form");
  const message = {
    loading: "img/spinner.svg",
    success: "Thanks! Will get in touch soon",
    failure: "Something went wrong"
  };
  forms.forEach(item => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
      display: block; margin: 0 auto`;
      form.insertAdjacentElement("afterend", statusMessage);
      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", json).then(data => {
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalWindowOpen)(modalSelector);
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
    <div class='modal__content'>
      <div data-modalclose class="modal__close">&times;</div>
      <div class="modal__title">${message}</div>
    </div>`;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.modalWindowClose)(modalSelector);
    }, 4000);
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "modalWindowClose": () => (/* binding */ modalWindowClose),
/* harmony export */   "modalWindowOpen": () => (/* binding */ modalWindowOpen)
/* harmony export */ });
function modalWindowOpen(modalSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.remove("hide");
  modalWindow.classList.add("show");
  document.body.style.overflow = "hidden";

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }

  ;
}

function modalWindowClose(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.remove("show");
  modalWindow.classList.add("hide");
  document.body.style.overflow = "";
}

function modal(modalSelector, triggerSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector),
        openModal = document.querySelectorAll(triggerSelector);
  openModal.forEach(btn => {
    btn.addEventListener("click", () => modalWindowOpen(modalSelector, modalTimerId));
  });
  modalWindow.addEventListener("click", e => {
    if (e.target === modalWindow || e.target.getAttribute("data-modalclose") == "") {
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/services/services.js":
/*!*****************************************!*\
  !*** ./js/modules/services/services.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResourses": () => (/* binding */ getResourses),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const getResourses = async url => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Couldn't reach ${url}, status ${res.sta}`);
  }

  return await res.json();
};

const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: data
  });
  return await res.json();
};



/***/ }),

/***/ "./js/modules/sliders.js":
/*!*******************************!*\
  !*** ./js/modules/sliders.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
  slides.forEach(slide => {
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
      currentSlide.textContent = `0${slideIndex += 1}`;
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    dots.forEach(dot => dot.style.opacity = "0.5");
    dots[slideIndex - 1].style.opacity = "1";
  });
  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
      currentSlide.textContent = `04`;
      slideIndex = slides.length;
    } else {
      offset -= +width.slice(0, width.length - 2);
      currentSlide.textContent = `0${slideIndex -= 1}`;
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    dots.forEach(dot => dot.style.opacity = "0.5");
    dots[slideIndex - 1].style.opacity = "1";
  });
  dots.forEach(dot => {
    dot.addEventListener("click", e => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      currentSlide.textContent = `0${slideIndex -= 1}`;
      dots.forEach(dot => dot.style.opacity = "0.5");
      dot.style.opacity = "1";
    });
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliders);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
  const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

  const hideContent = () => {
    tabsContent.forEach(item => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach(item => {
      item.classList.remove("tabheader__item_active");
    });
  };

  const showTabContent = function () {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.remove("hide");
    tabsContent[i].classList.add("show", "fade");
    tabs[i].classList.add("tabheader__item_active");
  };

  hideContent();
  showTabContent();
  tabsParent.addEventListener("click", event => {
    const target = event.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target === item) {
          hideContent();
          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(limit) {
  const deadline = new Date(limit);
  const promotionEnd = document.querySelector("#promotionEnd");
  const dateOfEnd = deadline.toLocaleString("us", {
    month: "long",
    day: "numeric"
  });
  promotionEnd.textContent = `${dateOfEnd} at 00:00`;

  const getReamainTime = deadlineTime => {
    const remainTime = deadlineTime - new Date();
    return {
      days: Math.floor(remainTime / (1000 * 60 * 60 * 24)),
      hours: Math.floor(remainTime / (1000 * 60 * 60) % 24),
      minutes: Math.floor(remainTime / (1000 * 60) % 60),
      seconds: Math.floor(remainTime / 1000 % 60)
    };
  };

  const getZero = num => {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  };

  const setClock = (selector, deadlineTime) => {
    const timer = document.querySelector(selector),
          days = timer.querySelector("#days"),
          hours = timer.querySelector("#hours"),
          minutes = timer.querySelector("#minutes"),
          seconds = timer.querySelector("#seconds"),
          timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function updateClock() {
      const timeRemained = getReamainTime(deadlineTime);
      days.innerHTML = getZero(timeRemained.days);
      hours.innerHTML = getZero(timeRemained.hours);
      minutes.innerHTML = getZero(timeRemained.minutes);
      seconds.innerHTML = getZero(timeRemained.seconds);

      if (timeRemained.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  };

  setClock(".timer", deadline);
}

;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/sliders */ "./js/modules/sliders.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");








window.addEventListener("DOMContentLoaded", function () {
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_6__.modalWindowOpen)('div.modal', modalTimerId), 30000);
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])("div.modal");
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__["default"])("10 July 2022");
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_6__["default"])("div.modal", "[data-modal]", modalTimerId);
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map