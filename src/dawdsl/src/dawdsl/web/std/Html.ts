export class Html {
  public static querySelectorAll(
    query: string,
    element?: HTMLElement
  ): HTMLElement[] {
    return Array.from((element || document).querySelectorAll(query)!).map(
      (e) => e as HTMLElement
    );
  }
}
