import About from "pages/About";
import Collections from "pages/Collections";
import Detail from "pages/Detail";
import Home from "pages/Home";

class App {
  constructor() {
    console.log("App")
    this.createPages();
  }

  createPages() {
    this.pages = {
      about: new About(),
      collections: new Collections(),
      detail: new Detail(),
      home: new Home()
    };
  }
}

new App();
