import { gsap } from "gsap";
import Animation from "classes/Animation";
// import { split, calculate } from "utils/text";
// import each from "lodash/each";

export default class Highlight extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    });
  }

  animateIn() {
    gsap.fromTo(this.element, {
      autoAlpha:0,
      delay:0.5,
    }, {
      autoAlpha:1,
      duration:1,
    });
  }

  animateOut() {
    gsap.set(this.element, {
      autoAlpha: 0,
    });
  }
}
