import { Html, Visitor, Any, TypeOf } from "../../std";
import { Component } from "./Component";

export type _Tree = { [key: string]: string | Tree | Tree[] };

export class Tree extends Component {
  private static parseTree(class_: string, tree: _Tree): string {
    function parseTreeRecursive(tree: _Tree): string {
      return Visitor.deepVisitor(tree, (k: Any, v: Any, t: Any) => {
        if (k.length === 0) return v;
        const id = k.join(".");
        const label = k[k.length - 1];
        if (TypeOf.String(v)) {
          return `<li class='${class_} string' ><span data-id="${id}">${label}</span></li>`;
        } else if (TypeOf.Array(v)) {
          return `<li class='${class_} array' ><span data-id="${id}">${label}</span>
                
                <ul>${(v as _Tree[])
                  .map((v) => parseTreeRecursive(v))
                  .join("")}</ul></li>`;
        } else {
          return `<li  class='${class_} object'><span data-id="${id}">${label}</span>
                
                <ul>${parseTreeRecursive(v as _Tree)}</ul></li>`;
        }
      });
    }
    return `<ul class="${class_} root">${parseTreeRecursive(tree)}</ul>`;
  }

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
