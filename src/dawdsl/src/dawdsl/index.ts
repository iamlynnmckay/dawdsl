import { renoisedsl } from "./renoisedsl";
import { Any } from "./stdjs";

export function dawdsl(language: string, argument: Any): Any {
  ({
    renoise: renoisedsl,
  })[language]?.run(argument);
}
