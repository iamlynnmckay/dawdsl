import { Specification } from "../../../framework";
import { AfterRenoiseLua } from "./AfterRenoiseLua";
import { BeforeRenoiseLua } from "./BeforeRenoiseLua";
import { CallBuiltInFunctions } from "./CallBuiltInFunctions";
import { ExpandEventPropertyArrays } from "./ExpandEventPropertyArrays";
import { FlattenEventArrays } from "./FlattenEventArrays";
import { NonEmptyDefaults } from "./NonEmptyDefaults";
import { RenoiseLua } from "./RenoiseLua";
import { SensibleDefaults } from "./SensibleDefaults";

const Compiler: Specification = [
  NonEmptyDefaults,
  SensibleDefaults,
  RenoiseLua,
  BeforeRenoiseLua,
  CallBuiltInFunctions,
  AfterRenoiseLua,
  ExpandEventPropertyArrays,
  FlattenEventArrays,
].flat();

export { Compiler };
