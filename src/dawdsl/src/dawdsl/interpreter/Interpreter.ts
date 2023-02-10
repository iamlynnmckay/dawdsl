import { NoOp } from "./NoOp";
import { DirectedAcyclicGraph } from "../common/Graph";
import { Specification } from "../common/Type";
const Interpreter: DirectedAcyclicGraph<Specification.Value> = [NoOp].flat();

export { Interpreter };
