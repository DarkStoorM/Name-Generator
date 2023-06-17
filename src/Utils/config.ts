import { C64 } from "./Generators/C64";
import { Mulberry32 } from "./Generators/Mulberry32";
import { IConfig } from "./Interfaces/IConfig";
import { TIndexedNumberGenerators } from "./Types/TIndexedNumberGenerators";
import { TNumberGenerator } from "./Types/TNumberGenerator";

const defaultGenerator: TIndexedNumberGenerators = "c64";

const numberGenerators: Record<TIndexedNumberGenerators, TNumberGenerator> = {
  c64: C64,
  mulberry32: Mulberry32,
};

export const config: IConfig = {
  numberGenerator: numberGenerators[defaultGenerator],
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
