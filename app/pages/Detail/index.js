import Page from "classes/Page";

export default class Detail extends Page {
  constructor() {
    console.log("Detail")
    super({
      id: "detail",

      element:'.detail'
    });
  }
}
