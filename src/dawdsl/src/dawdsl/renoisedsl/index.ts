import { Compiler } from "./compiler";
import { Interpreter } from "./interpreter";
import { Framework, Application } from "../jsondslfw";

const renoisedsl = new Application(Framework, Compiler, Interpreter);

export { renoisedsl };
