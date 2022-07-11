export const cardsData = [
  {
    img: "img/tabs/fitness.jpg",
    altimg: "fitness",
    title: "Food plan 'Fitness'",
    description: "The Fitness food plan is a new approach to cooking: more fresh vegetables and fruits. For people who are active and healthy, interested in sports. This is a brand new product with an optimal price and high quality!",
    price: 9
  },
  {
    img: "img/tabs/lean.jpg",
    altimg: "lean",
    title: "Food plan 'Lean'",
    description: "Our special Lean food plan is a careful selection of ingredients: the complete absence of animal products. Complete harmony with yourself and nature in every element! Everything will be 'Yummy'!",
    price: 13
  },
  {
    img: "img/tabs/premium.jpg",
    altimg: "premium",
    title: "Food plan 'Premium'",
    description: "For Premium food plan we use not only beautiful packaging design, but also high-quality execution of dishes. Different kinds of fish, seafood, fruits - you get  choice of dishes without going to a restaurant!",
    price: 15
  }
]

function cards(cardsData) {
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
    
      return cardsData.forEach(({ img, altimg, title, description, price }) =>
          new MenuCard(
            img,
            altimg,
            title,
            description,
            price,
            ".menu .container"
          ).render()
        )
}

export default cards;