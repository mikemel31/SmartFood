import { getResourses } from "./services/services";

function cards() {
    class MenuCard {
        constructor(
          src,
          alt,
          name,
          description,
          price,
          parentSelector,
          ...classes
        ) {
          this.name = name;
          this.description = description;
          this.price = price;
          this.src = src;
          this.alt = alt;
          this.parent = document.querySelector(parentSelector);
          this.classes = classes;
        }
        render() {
          const element = document.createElement("div");
          if (this.classes.length === 0) {
            this.classes = "menu__item";
            element.classList.add(this.classes);
          } else {
            this.classes.forEach((className) => element.classList.add(className));
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
    
      getResourses("http://localhost:3000/menu").then((data) =>
        data.forEach(({ img, altimg, title, description, price }) =>
          new MenuCard(
            img,
            altimg,
            title,
            description,
            price,
            ".menu .container"
          ).render()
        )
        );
}

export default cards;