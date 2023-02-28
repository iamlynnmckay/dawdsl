import { Visitor, Any, TypeOf } from "../../common/std";

export class Html {
  public static querySelectorAll(
    query: string,
    element?: HTMLElement
  ): HTMLElement[] {
    return Array.from((element || document).querySelectorAll(query)!).map(
      (e) => e as HTMLElement
    );
  }
  public static querySelectorAllChildren(
    query: string,
    element?: HTMLElement
  ): HTMLElement[] {
    return Html.querySelectorAll(query)
      .map((element) =>
        Array(element.childElementCount)
          .fill(null)
          .map((_, i) => element.children[i] as HTMLElement)
      )
      .flat();
  }
  public static querySelectorAllChildrenMatching(
    parentQuery: string,
    childQuery?: string,
    element?: HTMLElement
  ): HTMLElement[] {
    return childQuery
      ? Html.querySelectorAll(`#${parentQuery} ${childQuery!}`)
      : Html.querySelectorAllChildren(`${parentQuery}`);
  }
  public static listenForInnerText(type: string, elements: HTMLElement[]) {
    elements.map((element: HTMLElement) => {
      element.addEventListener(type, (e) => {
        element.innerText = (e as CustomEvent).detail.innerText;
      });
    });
  }
  public static listenForValue(type: string, elements: HTMLElement[]) {
    elements.map((element: HTMLElement) => {
      element.addEventListener(type, (e) => {
        (element as HTMLTextAreaElement | HTMLInputElement).value = (
          e as CustomEvent
        ).detail.value;
      });
    });
  }
  public static dispatchValueOnInput(type: string, elements: HTMLElement[]) {
    elements.map((element: HTMLElement) => {
      const event = new CustomEvent(type, {
        bubbles: true,
        detail: {
          value: () =>
            (element as HTMLTextAreaElement | HTMLInputElement).value,
        },
      });
      element.addEventListener("input", (e) => e.target?.dispatchEvent(event));
    });
  }
  public static dispatchOnClick(type: string, elements: HTMLElement[]) {
    elements.map((element: HTMLElement) => {
      const event = new CustomEvent(type, {
        bubbles: true,
        detail: { id: () => element.id },
      });
      element.addEventListener("click", (e) => e.target?.dispatchEvent(event));
    });
  }
}
