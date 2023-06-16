import { TNumberGenerators } from "../NameGenerator";

export const config = {
  numberGenerator: "mulberry32" as TNumberGenerators,
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
