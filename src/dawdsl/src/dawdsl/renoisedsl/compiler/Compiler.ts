import { Specification } from "../../jsondslfw";
import { NonEmptyDefaults } from "./NonEmptyDefaults";
import { SensibleDefaults } from "./SensibleDefaults";

const Compiler: Specification = [NonEmptyDefaults, SensibleDefaults].flat();

export { Compiler };
