import each from "lodash/each";
import EventEmitter from "events";

export default class Component extends EventEmitter {
  constructor({ element, elements }) {
    super()
    
    this.selector = element;
    this.selectorChildren = {
      ...elements,
    };

    this.create();
    this.addEventListeners();
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    // console.log('Create', this.id, this.element)

    each(this.selectorChildren, (entry, key) => {
      // console.log(entry, key)

      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = document.querySelectorAll(entry);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry);
        }
      }

      console.log(this.elements, "this.elements");
    });
  }

  addEventListeners() {}

  removeEventListeners() {}
}