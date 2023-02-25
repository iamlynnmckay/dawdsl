import { Html, Visitor, Any, TypeOf } from "../../std";
import { Component } from "./Component";


export class Tree extends Component {


  constructor(classList: string[], tree: _Tree) {
    super(classList);
    this.getElement().innerHTML = Tree.parseTree(classList.join(" "), tree);
  }

  public build(memory: { [_: string]: string }): void {
    Html.querySelectorAll(`#${this.getElement().id}`).map((element) => {
      Html.querySelectorAll(`span`, element).map(
        (span) =>
          (span.onclick = () => {
            const li = (span as HTMLElement).parentElement!;
            let path = "";
            Html.querySelectorAll(".string", element).map((e) =>
              e.classList.remove("onclick")
            );
            if (li.classList.contains("onclick")) {
              path = (
                li.parentElement!.parentElement!.children[0] as HTMLElement
              ).dataset.id!;
              li.classList.remove("onclick");
            } else {
              // @TODO: emit event here instead
              path = span.dataset.id!;
              if (li.classList.contains("string")) {
                Html.querySelectorAll(`textarea`).map(
                  (e) => ((e as HTMLTextAreaElement).value = memory[path] || "")
                );
              }
              li.classList.add("onclick");
            }
            if (li.classList.contains("string")) {
              Html.querySelectorAll(`.path`).map((e) => (e.innerHTML = path));
            }
          })
      );
    });
  }
}
