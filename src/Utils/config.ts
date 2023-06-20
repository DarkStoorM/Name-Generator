import { getNumberGenerator } from "./Functions/SelectGenerator";
import { C64 } from "./Generators/C64";
import { MultiplyWithCarry } from "./Generators/MultiplyWithCarry";
import { Mulberry32 } from "./Generators/Mulberry32";
import { IConfig } from "./Interfaces/IConfig";
import { TIndexedNumberGenerators } from "./Types/TIndexedNumberGenerators";
import { TNumberGenerator } from "./Types/TNumberGenerator";
import { SimpleFastCounter } from "./Generators/SimpleFastCounter32";
import { Xoshiro128 } from "./Generators/Xoshiro128";
import { JenkinsSmallFast } from "./Generators/JenkinsSmallFast";

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
availableNumberGenerators.set("Jenkin's Small Fast", JenkinsSmallFast);
availableNumberGenerators.set("Mulberry32", Mulberry32);
availableNumberGenerators.set("Multiply With Carry", MultiplyWithCarry);
availableNumberGenerators.set("Simple Fast Counter", SimpleFastCounter);
availableNumberGenerators.set("Xoshiro128", Xoshiro128);

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
