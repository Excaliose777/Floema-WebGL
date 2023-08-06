import { gsap } from "gsap";
import Animation from "classes/Animation";
// import { split, calculate } from "utils/text";
// import each from 'lodash/each'

export default class Paragraph extends Animation {
  constructor({element, elements}) {
    super({
      element,
      elements,
    });

    // this.elementLinesSpans = split({ element: this.element, append: true });
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

    // each(this.elementsLines, (line, index) => {
    //   this.timelineIn.fromTo(
    //     line,
    //     {
    //       autoAlpha:0,
    //       y:'100%'
    //     },
    //     {
    //       autoAlpha:1,
    //       duration: 1.5 ,
    //       ease:'expo.out',
    //       delay: index * 0.2,
    //       y:'0%'
    //     },0);
    // })

  // onResize() {
  //   this.elementsLines = calculate(this.elementLinesSpans)
  // }
}
