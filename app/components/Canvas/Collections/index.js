import map from "lodash/map";
import Media from "./Media";
import { Plane, Transform } from "ogl";
import gsap from "gsap";
import Prefix from 'prefix'

export default class {
  constructor({ gl, scene, sizes, transition }) {
    this.id = 'collections'

    this.gl = gl;
    this.scene = scene;
    this.sizes = sizes;
    this.transition = transition

    this.group = new Transform();

    this.transformPrefix = Prefix('transform')
    
    this.galleryElement = document.querySelector('.collections__gallery')
    this.galleryWrapperElement = document.querySelector(".collections__gallery__wrapper");
    this.mediasElements = document.querySelectorAll(".collections__gallery__media");
    this.collectionsElements = document.querySelectorAll('.collections__article')
    this.collectionsElementsActive = 'collections__article--active'

    this.titlesElement = document.querySelector('.collections__titles')

    this.scroll = {
      current:0,
      start:0,
      target:0,
      lerp:0.1,
      velocity:1
    };
    
    this.createGeometry();
    this.createGallery();

    this.onResize({ sizes: this.sizes });

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

    async show(){
      if(this.transition) {

        const{src} = this.transition.mesh.program.uniforms.tMap.value.image
        const texture = window.TEXTURES[src]
        const media = this.media.find(media => media.texture === texture)

        gsap.delayedCall(1, _ => {
          this.scroll.current = this.scroll.target = this.scroll.last = this.scroll.start = -media.mesh.position.x
        })

        this.transition.animate(this.medias[0].mesh, _ =>{
          map(this.medias, media => {
            if(media !== this.media) {
              media.show()
            }
          })

          this.media.opacity.multiplier = 1
        })
      } else {
        map(this.medias, media => media.show())
      }
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
    this.bounds = this.galleryWrapperElement.getBoundingClientRect();

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
   * Changed
   */

  onChange(index){
    this.index = index

    const selectedCollection = parseInt(this.mediasElements[this.index].getAttribute('data-index'))

    map(this.collectionsElements, (element, elementIndex) => {
      if(elementIndex === selectedCollection) {
        element.classList.add(this.collectionsElementsActive)
      } else{
        element.classList.remove(this.collectionsElementsActive)
      }
    })

    this.titlesElement.style[this.transformPrefix] = `translateY(-${25 * selectedCollection}%) translate(-50%, -50%) rotate(90deg)`

    this.media = this.medias[index]
  }

  /**
   * UPDATE
   */
  update() {
    // if (!this.bounds) return;

    this.scroll.target = gsap.utils.clamp(-this.scroll.limit, 0, this.scroll.target)

    this.scroll.current = gsap.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      this.scroll.lerp
    );

    this.galleryElement.style[this.transformPrefix] = `translateX(${this.scroll.current}px)`

    if (this.scroll.last < this.scroll.current) {
      this.scroll.direction = "right";
    } else if (this.scroll.last > this.scroll.current) {
      this.scroll.direction = "left";
    }

    this.scroll.last = this.scroll.current;

    const index = Math.floor(Math.abs((this.scroll.current - (this.medias[0].bounds.width / 2)) / this.scroll.limit) * (this.medias.length - 1))

    if(this.index !== index){
      this.onChange(index)
    }

    map(this.medias, (media, index) => {
      media.update(this.scroll.current, this.index);

      // media.mesh.position.y += Math.cos((media.mesh.position.x / this.sizes.width) * Math.PI * 0.1) * 40 - 40
    });

  }

  /**
   * Destroy
   */

  destroy(){
    this.scene.removeChild(this.group)
  }
}
