import { Assert } from "../../std";
import { Component } from "./Component";

export class Lua extends Component {
  constructor(classList: string[]) {
    super(classList);
    this.getElement().innerHTML = `<pre>...</pre>`;
  }
  public build(memory: { [_: string]: string }): void {
    Assert.true(true);
  }
}
