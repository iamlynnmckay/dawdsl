import { Application } from "./application";
import { Compiler } from "./compiler";
import { Interpreter } from "./interpreter";

const dawdsl = new Application(Compiler, Interpreter).evaluate

export {dawdsl}