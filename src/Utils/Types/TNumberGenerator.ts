import { BaseNumberGenerator } from "../Generators/BaseNumberGenerator";

/**
 * Provides a template type for the implemented random number generators
 */
export type TNumberGenerator = { new (): BaseNumberGenerator };
