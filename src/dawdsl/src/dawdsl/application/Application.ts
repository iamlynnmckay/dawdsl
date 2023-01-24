import { Framework } from "../framework"
import { Visitor, Any, Type, File } from "../common"

export class Application {
    #visitor: Any
    constructor(compiler: Any, interpreter: Any) {
        const config = {
            nameProperty: "name",
            dependencyOfProperty: "dependencyOf",
            dependsOnProperty: "dependsOn",
            definitionProperty: "definition"
        }
        this.#visitor = new Visitor(Framework(compiler, interpreter, config), config)
    }
    evaluate(argument: Any) {
        if (Type.string(argument)) {
            this.evaluate(File.readSync(argument))
        } else if (Type.array(argument)) {
            argument.forEach(this.evaluate)
        } else {
            this.#visitor.visit(argument)
        }
    }
}
