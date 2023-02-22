import { Any } from "../std";
import { Specification } from "./type";

export function Framework(
  languages: {
    [_: string]: { compiler: Specification; interpreter: Specification };
  },
  handler: (
    compiler: Specification,
    interpreter: Specification
  ) => (argument: Any) => Any
) {
  return (language: string) => {
    return handler(
      languages[language].compiler,
      languages[language].interpreter
    );
  };
}
