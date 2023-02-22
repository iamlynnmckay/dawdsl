import { Specification } from "../../../framework";
import { AfterRenoiseLua } from "./AfterRenoiseLua";
import { BeforeRenoiseLua } from "./BeforeRenoiseLua";
import { CallBuiltInFunctions } from "./CallBuiltInFunctions";
import { ExpandEventPropertyArrays } from "./ExpandEventPropertyArrays";
import { FlattenEventArrays } from "./FlattenEventArrays";
import { NonEmptyDefaults } from "./NonEmptyDefaults";
import { ParseDuration } from "./ParseDuration";
import { ParsePitch } from "./ParsePitch";
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
  ParseDuration,
  ParsePitch,
].flat();

export { Compiler };
