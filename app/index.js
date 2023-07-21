import each from "lodash/each";

import About from "pages/About";
import Collections from "pages/Collections";
import Detail from "pages/Detail";
import Home from "pages/Home";

import Preloader from "components/Preloader";
import Navigation from "components/Navigation";


class App {
  constructor() {
    this.createContent();

    this.createPreloader();
    this.createNavigation()
    this.createPages();

    this.addEventListeners()
    this.addLinkListeners();

    this.update()
  }

  createNavigation() {
    this.navigation = new Navigation({
      template: this.template
    })
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once("completed", this.onPreloaded.bind(this));
  }

  createContent() {
    this.content = document.querySelector(".content");
    this.template = this.content.getAttribute("data-template");
  }

  createPages() {
    this.pages = {
      about: new About(),
      collections: new Collections(),
      detail: new Detail(),
      home: new Home(),
    };

    this.page = this.pages[this.template];

    // console.log(this.page, this.template)
    this.page.create();
    
  }

  onPreloaded() {
    this.preloader.destroy();

    this.onResize();
    
    this.page.show();
  }

  onPopState(){
    this.onChange({
      url:window.location.pathname, 
      push:false
    })
  }

  async onChange({url, push = true}) {
    // console.log(url)
    await this.page.hide();
    const request = await window.fetch(url);

    if (request.status === 200) {
      const html = await request.text();
      const div = document.createElement("div");

      if(push){window.history.pushState({}, '', url)}

      div.innerHTML = html;

      const divContent = div.querySelector(".content");
      this.template = divContent.getAttribute("data-template");

      this.navigation.onChange(this.template)

      this.content.setAttribute("data-template", this.template);
      this.content.innerHTML = divContent.innerHTML;

      this.page = this.pages[this.template];

      this.page.create();

      this.onResize();

      this.page.show();

      this.addLinkListeners();

      // console.log(html)
    } else {
      console.log("Error");
    }

    // console.log(request)
  }

  onResize(){
    if(this.page && this.page.onResize){
      this.page.onResize()
    }
  }

  update(){
    if(this.page && this.page.update){
      this.page.update()
    }

    this.frame = window.requestAnimationFrame(this.update.bind(this))
  }


  addEventListeners() {
    window.addEventListener('popstate', this.onPopState.bind(this))
    window.addEventListener('resize', this.onResize.bind(this))
  }

  addLinkListeners() {
    const links = document.querySelectorAll("a");

    each(links, (link) => {
      link.onclick = (event) => {
        event.preventDefault();

        const { href } = link;

        this.onChange({url: href});

        // console.log(event, href)
      };
    });
  }
}

new App();
