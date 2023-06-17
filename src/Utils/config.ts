import { C64 } from "./Generators/C64";
import { Mulberry32 } from "./Generators/Mulberry32";
import { IConfig } from "./Interfaces/IConfig";
import { TIndexedNumberGenerators } from "./Types/TIndexedNumberGenerators";
import { TNumberGenerator } from "./Types/TNumberGenerator";

const defaultGenerator: TIndexedNumberGenerators = "mulberry32";

const availableNumberGenerators: Record<TIndexedNumberGenerators, TNumberGenerator> = {
  c64: C64,
  mulberry32: Mulberry32,
};

/**
 * Provides the application configs for defaults
 */
export const config: IConfig = {
  numberGenerator: availableNumberGenerators[defaultGenerator],
  casingPatterns: { lower: new RegExp(/[ab]/), upper: new RegExp(/[AB]/) },
  consonants: "bcdfghjklmnpqrstvwxz",
  defaultNamesCount: 30,
  defaultTemplate: "Abbaba Babaab",
  maximumCounterInputSize: 3,
  maximumNameLength: 20,
  maximumNamesCount: 50,
  maximumTemplateInputSize: 20,
  vowels: "aeiouy",
};
