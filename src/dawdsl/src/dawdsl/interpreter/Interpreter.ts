import { NoOp } from "./NoOp";
import { Specification } from "../application";
const Interpreter: Specification = [NoOp].flat();

export { Interpreter };
