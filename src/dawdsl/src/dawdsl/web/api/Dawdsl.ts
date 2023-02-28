import { Library } from "../../common/api";

export class Dawdsl {
  private memory: { [_: string]: string };
  constructor() {
    this.memory = {};
  }
  public api() {
    Library("renoise")({ program: {} });
  }
  public gui() {
    /*
    const parent = document.getElementById("dawdsl")!;
    const child = new Main(["dawdsl", "main"]);
    parent.innerHTML = ''
    parent.appendChild(child.getElement());
    child.build(this.memory);
    */
  }
}
