import map from "lodash/map";
import Media from "./Media";
import { Plane, Transform } from "ogl";
import gsap from "gsap";

import { lerp } from "utils/math";

export default class {
  constructor({ gl, scene, sizes }) {
    this.gl = gl;
    this.scene = scene;
    this.sizes = sizes;
    this.group = new Transform();

    this.galleryElement = document.querySelector(".collections__gallery__wrapper");
    this.mediasElements = document.querySelectorAll(".collections__gallery__media");

    this.scroll = {
      current:0,
      start:0,
      target:0,
      lerp:0.1,
      velocity:1
    };
    
    this.createGeometry();
    this.createGallery();

    this.group.setParent(this.scene);

    this.show()
  }

  createGeometry() {
    this.geometry = new Plane(this.gl);
  }

  createGallery() {
    this.medias = map(this.mediasElements, (element, index) => {
      return new Media({
        element,
        geometry: this.geometry,
        index,
        gl: this.gl,
        scene: this.group,
        sizes: this.sizes,
      });
    });
  }

    /**
   * ANimations
   */

    show(){
      map(this.medias, media => media.show())
    }
  
    hide(){
      map(this.medias, media => media.hide())
    }
  
  /**
   *
   * EVENTS
   */

  onResize(event) {

    this.sizes = event.sizes;
    this.bounds = this.galleryElement.getBoundingClientRect();

    this.scroll.x = this.scroll.target = 0
    
    map(this.medias, (media) => media.onResize(event, this.scroll));

    this.scroll.limit = this.bounds.width - this.medias[0].element.clientWidth
  }

  onTouchDown({ x, y }) {
    this.scroll.last = this.scroll.current;
  }

  onTouchMove({ x, y }) {
    const distance = x.start - x.end;

    this.scroll.target = this.scroll.last - distance;
  }

  onTouchUp({ x, y }) {}

  onWheel({pixelY}){
    this.scroll.target += pixelY
  }

  /**
   * UPDATE
   */
  update() {
    if (!this.bounds) return;

    this.scroll.target = gsap.utils.clamp(-this.scroll.limit, 0, this.scroll.target)

    this.scroll.current = gsap.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      this.scroll.lerp
    );

    if (this.scroll.last < this.scroll.current) {
      this.scroll.direction = "right";
    } else if (this.scroll.last > this.scroll.current) {
      this.scroll.direction = "left";
    }

    this.scroll.last = this.scroll.current;

    map(this.medias, (media, index) => {

      media.update(this.scroll.current);
    });
  }

  /**
   * Destroy
   */

  destroy(){
    this.scene.removeChild(this.group)
  }
}
