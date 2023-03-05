import { Specification } from "../../../framework";
import { AfterRenoiseLua } from "./AfterRenoiseLua";
import { BeforeRenoiseLua } from "./BeforeRenoiseLua";
import { CallBuiltInFunctions } from "./CallBuiltInFunctions";
import { ExpandEventPropertyArrays } from "./ExpandEventPropertyArrays";
import { FlattenEventArrays } from "./FlattenEventArrays";
import { NonEmptyDefaults } from "./NonEmptyDefaults";
import { RenoiseLua } from "./RenoiseLua";
import { SensibleDefaults } from "./SensibleDefaults";
import { TranslateSyntacticSugar } from "./TranslateSyntacticSugar";

const Compiler: Specification = [
  AfterRenoiseLua,
  BeforeRenoiseLua,
  CallBuiltInFunctions,
  ExpandEventPropertyArrays,
  FlattenEventArrays,
  NonEmptyDefaults,
  RenoiseLua,
  SensibleDefaults,
  TranslateSyntacticSugar,
].flat();

export { Compiler };
