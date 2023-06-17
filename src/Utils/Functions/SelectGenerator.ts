import { TIndexedNumberGenerators } from "../Types/TIndexedNumberGenerators";
import { TNumberGenerator } from "../Types/TNumberGenerator";
import { availableNumberGenerators } from "../config";

/**
 * Selects and returns the random number generator from available generators map and performs
 * internal null check
 *
 * @param   {TIndexedNumberGenerators}  generatorIndex  Index (name) of the number generator
 */
export function getNumberGenerator(generatorIndex: TIndexedNumberGenerators): TNumberGenerator {
  const generator = availableNumberGenerators.get(generatorIndex);

  if (!generator) {
    throw new Error(`No generator found for this index: ${generatorIndex}`);
  }

  return generator;
}
