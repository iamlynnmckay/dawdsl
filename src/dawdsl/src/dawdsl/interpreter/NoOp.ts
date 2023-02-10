import { DirectedAcyclicGraph } from "../common/Graph";
import { Specification } from "../common/Type";
const NoOp: DirectedAcyclicGraph<Specification.Value> = [
  {
    key: "NoOp",
    before: [],
    after: [],
    definition: {},
  },
];

export { NoOp };
