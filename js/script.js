import calc from './modules/calc';
import tabs from './modules/tabs';
import cards from './modules/cards';
import forms from './modules/forms';
import sliders from './modules/sliders';
import timer from './modules/timer';
import modal from './modules/modal'
import {modalWindowOpen} from './modules/modal'

window.addEventListener("DOMContentLoaded", function () {
  const modalTimerId = setTimeout(() => modalWindowOpen('div.modal', modalTimerId), 30000);
    calc();
    tabs();
    cards();
    forms("div.modal");
    sliders();
    timer("25 July 2022");
    modal("div.modal", "[data-modal]", modalTimerId);
    });
