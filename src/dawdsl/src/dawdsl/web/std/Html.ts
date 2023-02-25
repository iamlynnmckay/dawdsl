import { Visitor, Any, TypeOf } from "../../common/std";

export type _Tree = { [key: string]: string | _Tree | _Tree[] };

export class Html {
  public static querySelectorAll(
    query: string,
    element?: HTMLElement
  ): HTMLElement[] {
    return Array.from((element || document).querySelectorAll(query)!).map(
      (e) => e as HTMLElement
    );
  }
  public static appendChildModule(parent: HTMLElement, tag: string, class_: string) {
    let element = document.createElement(tag);
    element.id = `${parent.id}-${class_}`;
    Array.from(parent.classList).concat([class_]).map(class_ => element.classList.add(class_))
    parent.appendChild(element)
  }
 private static parseTree(tree: _Tree): string {
      function parseTreeRecursive(tree: _Tree): string {
        return Visitor.deepVisitor(tree, (k: Any, v: Any, t: Any) => {
          if (k.length === 0) return v;
          const id = k.join(".");
          const label = k[k.length - 1];
          if (TypeOf.String(v)) {
            return `<li id="${id}" class='string'><span>${label}</span></li>`;
          } else if (TypeOf.Array(v)) {
            return `<li id="${id}" class='array'><span>${label}</span>
                  
                  <ul>${(v as _Tree[])
                    .map((v) => parseTreeRecursive(v))
                    .join("")}</ul></li>`;
          } else {
            return `<li id="${id}" class='object'><span>${label}</span>
                  
                  <ul>${parseTreeRecursive(v as _Tree)}</ul></li>`;
          }
        });
      }
      return `<ul class="root">${parseTreeRecursive(tree)}</ul>`;
    }

  public static appendChildTreeModule(parent: HTMLElement, tag: string, class_: string) {
    // @@@TODO: HERE!!!
  }
  public static listenAndSetInnerText(id: string) {
    Html.querySelectorAll(`#${id}`).map((element: HTMLElement) => {
      element = element.children[0] as HTMLElement
      element.addEventListener(`#${id}`, (e) => {
        element.innerText = (e as CustomEvent).detail.innerText
      })
    })
  }
public static listenAndSetValue(id: string) {
    Html.querySelectorAll(`#${id}`).map((element: HTMLElement) => {
      element = element.children[0] as HTMLElement
      element.addEventListener(`#${id}`, (e) => {
        (element as HTMLTextAreaElement | HTMLInputElement).value = (e as CustomEvent).detail.value
      })
    })
  }
  public static listenOnInputAndDispatchValue(id: string) {
      Html.querySelectorAll(`#${id}`).map((element: HTMLElement) => {
        element = element.children[0] as HTMLElement
        let event = new CustomEvent(`#${id}`, {
          bubbles: true,
          detail: {value: () => (element as HTMLTextAreaElement | HTMLInputElement).value }
        })
        element.addEventListener("input", (e) => e.target?.dispatchEvent(event))
      })
    }

    public static listenOnClickForList(id: string) {
      Html.querySelectorAll(`#${id} li`).map((element: HTMLElement) => {
        let event = new CustomEvent(`#${id}`, {
          bubbles: true,
          detail: {element: () => element.id }
        })
        element.addEventListener("click", (e) => e.target?.dispatchEvent(event))
      })
    }
   

}




