import { Assert } from "../../std";
import { Component } from "./Component";

export class Help extends Component {
  constructor(classList: string[]) {
    super(classList);
    this.getElement().innerHTML = `...`;
  }
  public build(memory: { [_: string]: string }): void {
    Assert.true(true);
  }
}
