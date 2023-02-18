import { Specification } from "../../jsondslfw";
import { NonEmptyDefaults } from "./NonEmptyDefaults";
import { RenoiseLua } from "./RenoiseLua";
import { BeforeRenoiseLua } from "./BeforeRenoiseLua";
import { AfterRenoiseLua } from "./AfterRenoiseLua";
import { SensibleDefaults } from "./SensibleDefaults";
import { ExpandEventPropertyArrays } from "./ExpandEventPropertyArrays";
import { FlattenEventArrays } from "./FlattenEventArrays";
import { ParseDuration } from "./ParseDuration";
import { ParsePitch } from "./ParsePitch";

const Compiler: Specification = [
  NonEmptyDefaults,
  SensibleDefaults,
  RenoiseLua,
  BeforeRenoiseLua,
  AfterRenoiseLua,
  ExpandEventPropertyArrays,
  FlattenEventArrays,
  ParseDuration,
  ParsePitch,
].flat();

export { Compiler };
