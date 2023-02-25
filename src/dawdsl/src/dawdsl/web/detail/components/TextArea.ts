import { Html } from "../../../../../static/bundle";
import { Assert } from "../../std";
import { Component } from "./Component";

export class Editor extends Component {
  constructor(classList: string[]) {
    super(classList);
    this.getElement().innerHTML = `<textarea class="${classList.join(
      " "
    )}"></textarea>`;
  }
  public build(): void {
    Html.querySelectorAll(`${this.getElement().id} textarea`).map((element: HTMLTextAreaElement) => {
      let event = new CustomEvent(this.getElement().id, {
        bubbles: true,
        detail: {value: () => element.value }
      })
      element.addEventListener("input", (e) => e.target?.dispatchEvent(event))
    })
  }
}
