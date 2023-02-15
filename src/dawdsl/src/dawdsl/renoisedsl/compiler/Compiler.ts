import { Specification } from "../../jsondslfw";
import { NonEmptyDefaults } from "./NonEmptyDefaults";
import { RenoiseLua } from "./RenoiseLua";
import { BeforeRenoiseLua } from "./BeforeRenoiseLua";
import { AfterRenoiseLua } from "./AfterRenoiseLua";
import { SensibleDefaults } from "./SensibleDefaults";

const Compiler: Specification = [
  NonEmptyDefaults,
  SensibleDefaults,
  RenoiseLua,
  BeforeRenoiseLua,
  AfterRenoiseLua,
].flat();

export { Compiler };
