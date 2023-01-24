import { NonEmptyDefaults } from "./NonEmptyDefaults"
import { SensibleDefaults } from "./SensibleDefaults"

const Compiler = [
    NonEmptyDefaults, 
    SensibleDefaults
].flat()

export {Compiler}