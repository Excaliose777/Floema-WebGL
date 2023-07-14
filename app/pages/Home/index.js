import Page from "../../classes/page";

export default class Home extends Page {
  constructor() {
    super({
      id: "home",
      element:'.home',
      elements: {
        navigation: document.querySelector('.navigation'),
        link: '.home__link'
      }
    });
  }
}
