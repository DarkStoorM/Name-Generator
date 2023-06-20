/**
 * Provides index names for the implemented random number generators
 *
 * Newly implemented number generators have to be added to this union
 */
export type TIndexedNumberGenerators =
  | "C64"
  | "Jenkin's Small Fast"
  | "Mulberry32"
  | "Multiply With Carry"
  | "Simple Fast Counter"
  | "Xoshiro128";
