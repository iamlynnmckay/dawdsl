import { Specification } from "../application";
import { NonEmptyDefaults } from "./NonEmptyDefaults";
import { SensibleDefaults } from "./SensibleDefaults";

const Compiler: Specification = [NonEmptyDefaults, SensibleDefaults].flat();

export { Compiler };
