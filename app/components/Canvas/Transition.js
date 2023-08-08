import gsap from "gsap";
import { Program, Plane, Mesh, Texture } from "ogl";

import fragment from "shaders/plane-fragment.glsl";
import vertex from "shaders/plane-vertex.glsl";

export default class {
  constructor({ collections, gl, url, scene, sizes }) {
    this.collections = collections;
    this.gl = gl;
    this.scene = scene;
    this.sizes = sizes;
    this.url = url;

    this.geometry = new Plane();

    this.createTexture();
    this.createProgram();
    this.createMesh();

    this.extra = {
      x: 0,
      y: 0,
    };
  }

  createTexture() {
    const image = this.element.querySelector(
      ".collections__gallery__media__image"
    );

    this.texture = window.TEXTURES[image.getAttribute("data-src")];
  }

  createProgram() {
    this.program = new Program(this.gl, {
      fragment,
      vertex,
      uniforms: {
        uAlpha: { value: 1 },
        tMap: { value: this.texture },
      },
    });
  }

  createMesh() {
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });

    this.mesh.setParent(this.scene);
  }

  //   createBounds({ sizes }) {
  //     this.sizes = sizes

  //     this.bounds = this.element.getBoundingClientRect()

  //     this.updateScale()
  //     this.updateX()
  //     this.updateY()

  //   }

  /**
   * ANIMATIONS
   */
  transition() {}
}
