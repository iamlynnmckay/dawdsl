import { Compiler } from "./compiler";
import { Interpreter } from "./interpreter";
import { Application } from "./application";
import { Framework } from "./framework";

const dawdsl = new Application(Framework, Compiler, Interpreter);

export { dawdsl };
