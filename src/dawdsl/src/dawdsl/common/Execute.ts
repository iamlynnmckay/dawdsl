import { Is } from "./Is";
import { Any } from "./Any";
import { File } from "./File";

export function execute(evaluate: Function, argument: Any) {
  if (Is.String(argument)) {
    execute(evaluate, JSON.parse(File.readSync(argument)));
  } else if (Is.Array(argument)) {
    argument.forEach((arg: Any) => execute(evaluate, arg));
  } else {
    evaluate(argument);
  }
}
