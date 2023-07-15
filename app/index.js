import About from "pages/About";
import Collections from "pages/Collections";
import Detail from "pages/Detail";
import Home from "pages/Home";
import each from 'lodash/each'

class App {
  constructor() {
    this.createContent();
    this.createPages();
    this.addLinkListeners();

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

    console.log(this.page)
    this.page.create();
    this.page.show();
  }

  onChange(url){
    console.log(url)
  }
  addLinkListeners () {
    const links = document.querySelectorAll('a')

    each(links, (link) => {
      link.onClick = (event) => {
        event.preventDefault()

        const { href } = link
        this.onChange(href)
        console.log(event, href)
      }
    }) 
  }
}

new App();
