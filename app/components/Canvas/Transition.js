import gsap from "gsap";
import { Program, Plane, Mesh } from "ogl";

import fragment from "shaders/plane-fragment.glsl";
import vertex from "shaders/plane-vertex.glsl";

export default class {
  constructor({ collections, gl, url, scene, sizes }) {
    this.collections = collections;
    this.gl = gl;
    this.scene = scene;
    this.sizes = sizes;
    this.url = url;

    this.geometry = new Plane(this.gl);
  }

  createProgram(texture) {
    this.program = new Program(this.gl, {
      fragment,
      vertex,
      uniforms: {
        uAlpha: { value: 1 },
        tMap: { value: texture},
      },
    });
  }

  createMesh(mesh) {
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });

    this.mesh.scale.x = mesh.scale.x;
    this.mesh.scale.y = mesh.scale.y;
    this.mesh.scale.z = mesh.scale.z;

    this.mesh.position.x = mesh.position.x;
    this.mesh.position.y = mesh.position.y;
    this.mesh.position.z = mesh.position.z + 0.01;

    this.mesh.setParent(this.scene);
  }

  /**
   * SET ELEMENT
   */

  setElement(element) {
    if (element.id === 'collections'){
      const { index, medias } = element
      const media = medias[index]

      this.createProgram(media.texture);
      this.createMesh(media.mesh);

      this.transition = 'detail'
    } else {
      this.createProgram(element.texture);
      this.createMesh(element.mesh);

      this.transition = 'collections'
    }
  }

  /**
   * ANIMATIONS
   */
  animate(element, onComplete) {
    if(this.transition === 'detail'){
      const timeline = gsap.timeline({
        delay: 0.5,
        onComplete
      })

      timeline.to(this.mesh.scale, {
        duration:1.5,
        ease: 'expo.inOut',
        x: element.scale.x,
        y: element.scale.y,
        z: element.scale.z,
      })
  
      timeline.to(this.mesh.position, {
        duration:1.5,
        ease: 'expo.inOut',
        x: element.position.x,
        y: element.position.y,
        z: element.position.z,
      })
    } else {
      const timeline = gsap.timeline({
        delay: 0.5,
        onComplete
      })

      timeline.to(this.mesh.scale, {
        duration:1.5,
        ease: 'expo.inOut',
        x: element.scale.x,
        y: element.scale.y,
        z: element.scale.z,
      })
  
      timeline.to(this.mesh.position, {
        duration:1.5,
        ease: 'expo.inOut',
        x: element.position.x,
        y: element.position.y,
        z: element.position.z,
      })
    }
  }
}
