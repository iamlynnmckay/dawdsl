import { Assert } from "../../std";
import { Component } from "./Component";

export class Status extends Component {
  constructor(classList: string[]) {
    super(classList);
    this.getElement().innerHTML = `<pre class='path'>...</pre>`;
  }
  public build(memory: { [_: string]: string }): void {
    Assert.true(true);
  }
}
