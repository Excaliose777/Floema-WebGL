export default class Gallery {
  constructor({element, geometry, gl, scene, sizes, index}) {
    this.element = element
    this.geometry = geometry
    this.gl = gl
    this.scene = scene
    this.sizes = sizes
    this.index = index

    this.createMedias()
  }

  createMedias(){
    this.mediasElements = this.element.querySelectorAll('.about__gallery__media')
  }
}
