import { beforeAll, beforeEach, describe, expect, test } from "vitest";
import { availableNumberGenerators, config } from "../src/Utils/config";

/*
 * --------------------------------------------------------------------------
 * Generator Tests
 * --------------------------------------------------------------------------
 *
 * These tests mostly make no sense, because they were written for period
 * testing purposes and to make sure all letters will get picked.
 *
 * NOTE: since the consonants/vowels are in separate tables, they **will** be tested separately
 *
 */

describe("Implemented number generator tests", (): void => {
  const generatedConsonants = new Set<string>();
  const generatedVowels = new Set<string>();
  const lettersCountPerGenerator = new Map<string, number>();

  /**
   * Create the character table first
   *
   * This is not really needed, but helps with peeking at the distribution
   */
  beforeAll((): void => {
    for (const consonant of config.consonants) {
      lettersCountPerGenerator.set(consonant, 0);
    }

    for (const vowel of config.vowels) {
      lettersCountPerGenerator.set(vowel, 0);
    }
  });

  beforeEach((): void => {
    generatedConsonants.clear();
    generatedVowels.clear();

    for (const [letter] of lettersCountPerGenerator) {
      lettersCountPerGenerator.set(letter, 0);
    }
  });

  [...availableNumberGenerators.entries()].forEach(([generatorName, generatorClass]): void => {
    const generator = new generatorClass();

    test(`Tests if ${generatorName} is not skipping letters`, (): void => {
      for (let x = 0; x < 1000000; x++) {
        const consonant = config.consonants[generator.next(config.consonants)];
        const vowel = config.vowels[generator.next(config.vowels)];

        generatedConsonants.add(consonant);
        generatedVowels.add(vowel);

        lettersCountPerGenerator.set(consonant, (lettersCountPerGenerator.get(consonant) ?? 0) + 1);
        lettersCountPerGenerator.set(vowel, (lettersCountPerGenerator.get(vowel) ?? 0) + 1);
      }

      console.log(`Statistics for: ${generatorName}`);
      const stats = new Map([...lettersCountPerGenerator.entries()].sort((a, b) => b[1] - a[1]));
      console.log(stats);

      expect(generatedConsonants.size, `Consonants from ${generatorName}`).toBe(config.consonants.length);
      expect(generatedVowels.size, `Vowels from  ${generatorName}`).toBe(config.vowels.length);
    });
  });
});
