import { Assert } from "../../std";

export class Component {
  private element: HTMLElement;
  constructor(classList: string[]) {
    this.element = document.createElement("div");
    this.element.id = classList.join("-");
    classList.map(class_ => this.element.classList.add(class_))
  }
  public getElement() {
    return this.element;
  }
  public build(memory: { [_: string]: string }): void {
    Assert.true(true);
  }
}
