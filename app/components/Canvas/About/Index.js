import map from "lodash/map";
import Gallery from "./Gallery";
import { Plane, Transform } from "ogl";
import gsap from "gsap";

export default class {
  constructor({ gl, scene, sizes }) {
    this.gl = gl;
    this.sizes = sizes;

    this.group = new Transform();

    this.createGeometry();
    this.createGalleries();

    this.group.setParent(scene);

  }

  createGeometry() {
    this.geometry = new Plane(this.gl);
  }

  createGalleries() {
    this.galleriesElements = document.querySelectorAll(".about__gallery");

    this.galleries = map(this.galleriesElements, (element, index) => {
      return new Gallery({
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
   *
   * EVENTS
   */

  onResize(event) {
    map(this.galleries, gallery => gallery.onResize(event))
  }

  onTouchDown({ x, y }) {
    map(this.galleries, gallery => gallery.onTouchDown(event))
  }

  onTouchMove({ x, y }) {
    map(this.galleries, gallery => gallery.onTouchMove(event))
  }

  onTouchUp({ x, y }) {
    map(this.galleries, gallery => gallery.onTouchUp(event))
  }

  onWheel({ pixelX, pixelY }) {
  }

  /**
   * UPDATE
   */
  update() {
    if (!this.galleryBounds) return;
    map(this.galleries, gallery => gallery.update())
  }
}
