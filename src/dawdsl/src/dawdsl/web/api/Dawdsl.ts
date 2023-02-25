import { Library } from "../../common/api";
import { Main } from "../detail/Main";

export class Dawdsl {
  private memory: { [_: string]: string };
  constructor() {
    this.memory = {};
  }
  public api() {
    Library("renoise")({ program: {} });
  }
  public gui() {
    const parent = document.getElementById("dawdsl")!;
    const child = new Main(["dawdsl", "content"]);
    parent.innerHTML = ''
    parent.appendChild(child.getElement());
    child.build(this.memory);
  }
}
