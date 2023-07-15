import Page from "classes/Page";

export default class Collections extends Page {
  constructor() {
    console.log("Collections")
    super({
      id: "collections",

      element:'.collections'
    });
  }
}
