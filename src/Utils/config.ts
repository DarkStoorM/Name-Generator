import { getNumberGenerator } from "./Functions/SelectGenerator";
import { C64 } from "./Generators/C64";
import { Mulberry32 } from "./Generators/Mulberry32";
import { IConfig } from "./Interfaces/IConfig";
import { TIndexedNumberGenerators } from "./Types/TIndexedNumberGenerators";
import { TNumberGenerator } from "./Types/TNumberGenerator";

/**
 * Exposes a map of implemented random number generators
 */
export const availableNumberGenerators: Map<TIndexedNumberGenerators, TNumberGenerator> = new Map();

/**
 * All newly implemented random number generators have to be added to this map
 * along with an update to the indexed generators type
 *
 * @see TIndexedNumberGenerators
 */
availableNumberGenerators.set("C64", C64);
availableNumberGenerators.set("Mulberry32", Mulberry32);

/**
 * Provides the application configs for defaults
 */
export const config: IConfig = {
  numberGenerator: Mulberry32,
  currentGenerator: "Mulberry32",
  casingPatterns: { lower: new RegExp(/[ab]/), upper: new RegExp(/[AB]/) },
  consonants: "fndplzjhwbcqmykrtvxsg",
  defaultNamesCount: 30,
  defaultTemplate: "Abbaba Babaab",
  maximumCounterInputSize: 3,
  maximumNameLength: 20,
  maximumNamesCount: 50,
  maximumTemplateInputSize: 20,
  vowels: "eoiua",
  changeGenerator(generatorIndex: TIndexedNumberGenerators) {
    this.currentGenerator = generatorIndex;
    this.numberGenerator = getNumberGenerator(generatorIndex);
  },
};
