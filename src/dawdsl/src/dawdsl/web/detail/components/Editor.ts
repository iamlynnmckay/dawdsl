import { Assert } from "../../std";
import { Component } from "./Component";

export class Editor extends Component {
  constructor(classList: string[]) {
    super(classList);
    this.getElement().innerHTML = `<textarea class="${classList.join(
      " "
    )}"></textarea>`;
  }
  public build(memory: { [_: string]: string }): void {
    Assert.true(true);
  }
}
