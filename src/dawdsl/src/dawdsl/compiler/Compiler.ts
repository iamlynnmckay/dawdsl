import { DirectedAcyclicGraph } from "../common/Graph";
import { Specification } from "../common/Type";
import { NonEmptyDefaults } from "./NonEmptyDefaults";
import { SensibleDefaults } from "./SensibleDefaults";

const Compiler: DirectedAcyclicGraph<Specification.Value> = [
  NonEmptyDefaults,
  SensibleDefaults,
].flat();

export { Compiler };
