import { Specification } from "../../../framework";
import { NoOp } from "./NoOp";

const Interpreter: Specification = [NoOp].flat();

export { Interpreter };
