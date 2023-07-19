import Component from "classes/Component";
import { COLOR_QUARTER_SPANISH_WHITE, COLOR_BRIGHT_GRAY } from "../utils/color";
import { gsap } from "gsap";

export default class Navigation extends Component {
  constructor({template}) {
    super({
      element: ".navigation",
      elements: {
        links:'.navigation__list__link',
        items:'.navigation__list__item',
      },
    });

    this.onChange(template)
  }

  onChange (template) {
    if(template === 'about'){
      gsap.to(this.element, {
        color: COLOR_BRIGHT_GRAY,
        duration: 1.5
      })
      gsap.to(this.elements.items[0], {
        autoAlpha:1,
        delay:0.75,
        duration:0.75
      })

      gsap.to(this.elements.items[1], {
        autoAlpha:0,
        duration:0.75
      })

    } else {
      gsap.to(this.element, {
        color: COLOR_QUARTER_SPANISH_WHITE,
        duration: 1.5
      })

      gsap.to(this.elements.items[0], {
        autoAlpha:0,
        duration:0.75
      })

      gsap.to(this.elements.items[1], {
        autoAlpha:1,
        delay:0.75,
        duration:0.75
      })
    }
  }
}
