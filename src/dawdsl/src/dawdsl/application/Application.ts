import { Framework } from "../framework";
import { Visitor, Any, Type, File } from "../common";

export class Application {
  #visitor: Any;
  constructor(compiler: Any, interpreter: Any) {
    const config = {
      nameProperty: "name",
      dependencyOfProperty: "dependencyOf",
      dependsOnProperty: "dependsOn",
      definitionProperty: "definition",
    };
    const framework = Framework(compiler, interpreter, config);
    this.#visitor = new Visitor(framework, config);
  }
  static #_evaluate(_this: Application, argument: Any) {
    if (Type.string(argument)) {
      Application.#_evaluate(_this, JSON.parse(File.readSync(argument)));
    } else if (Type.array(argument)) {
      argument.forEach((arg: Any) => Application.#_evaluate(_this, arg));
    } else {
      _this.#visitor.visit(argument);
    }
  }
  evaluate(argument: Any) {
    return Application.#_evaluate(this, argument);
  }
}
