import { C64 } from "./Utils/Generators/C64";
import { Mulberry32 } from "./Utils/Generators/Mulberry32";
import { IRNG } from "./Utils/Interfaces/IRNG";
import { TLettersTable } from "./Utils/Types/TLettersTable";
import { config } from "./Utils/config";

export type TNumberGenerators = "c64" | "mulberry32";
const generators: Record<TNumberGenerators, { new (state: number): object }> = {
  c64: C64,
  mulberry32: Mulberry32,
};

class Generator {
  /**
   * Internal array of number generator instances
   */
  private generators: IRNG[] = [];
  /**
   * Set at runtime, flag indicating the next processed letter has matched the lowercase pattern
   */
  private hasMatchedLowercase = false;
  /**
   * Set at runtime, flag indicating the next processed letter has matched the uppercase pattern
   */
  private hasMatchedUppercase = false;
  /**
   * Flag as an argument for the callable methods returning the next character as uppercase, when `true`
   */
  private isCapital = false;
  /**
   * Flag used for interruption when multiple concurrent spaces were provided in the input template
   */
  private lastCharacterWasSpace = false;
  /**
   * Object of callable methods returning a random character
   */
  private lettersTable: TLettersTable;
  /**
   * Internal result, which is concatenated at runtime from the input pattern
   */
  private result = "";
  /**
   * Currently indexed generator instance assigned when generating new names
   */
  private declare rng: IRNG;

  public constructor() {
    this.lettersTable = {
      a: this.pickVowel,
      A: this.pickVowel,
      b: this.pickConsonant,
      B: this.pickConsonant,
    };

    // Pre-fill on start
    this.createGenerators();
  }

  /**
   * Repopulates the generators array with instances of the C64 PRNGs
   */
  public createGenerators = (): void => {
    const generator = generators[config.numberGenerator];
    // Make max generators at start to not regenerate the existing results when changing
    // the names count
    this.generators = Array.from({ length: config.maximumNamesCount }, () => new generator(generator.makePseudoSeed()));
  };

  /**
   * Converts the input pattern into randomly generated name
   *
   * @param   {string}  inputString  Input pattern, that should match the following: `/[aAbB]/`
   * @param   {number}  index        Index of the generator in the `generators` array
   */
  public generateName = (inputString: string, index: number): string => {
    this.rng = this.generators[index];

    inputString.split("").forEach((letter: string): void => {
      this.processCharacter(letter);

      // Generate only as much letters as the defined maximum
      if (this.hasExceededLength()) {
        return;
      }

      if (letter === " ") {
        // Consecutive spaces should interrupt the generation
        if (this.lastCharacterWasSpace) {
          return;
        }

        this.lastCharacterWasSpace = true;
        this.result += " ";

        /**
         * We have to force-change the state, because if we enter space into the input, the next
         * state is skipped, which will cause the generator to create a different name, when
         * entering an example template template: "Abab Babba".
         * When we enter a template character into the place of space, new name will appear,
         * because it's calling next() under the hood, regenerating the remaining string, which
         * is an unwanted behavior.
         *
         * The does not apply to illegal characters, that don't match the casing patterns.
         */
        this.rng.next("");
        // -- The above is an exception to force-generate, but don't use the result

        return;
      } else {
        this.lastCharacterWasSpace = false;
      }

      if (!this.hasMatchedThePattern()) {
        return;
      }

      // Force-cast, because we know the `letter` matches our patterns
      this.result += this.lettersTable[letter as keyof TLettersTable](this.isCapital);
    });

    // Reset this result to prepare the caller for a new name
    const res = this.result;
    this.reset();

    return res;
  };

  /**
   * Returns a random letter from the given string of characters
   *
   * @param   {string}   letters    A string of characters to pick from - either consonants or vowels
   * @param   {boolean}  asCapital  When true, will be convert the picked letter to uppercase
   */
  private getRandomLetter = (letters: string, asCapital?: boolean) => {
    const letter = letters[this.rng.next(letters)];

    return asCapital ? letter.toUpperCase() : letter;
  };

  /**
   * Compare the generated result length with the maximum allowed name length
   */
  private hasExceededLength = (): boolean => {
    return this.result.length >= config.maximumNameLength;
  };

  /**
   * Checks if the next processed letter has matched the template patterns for name generation
   */
  private hasMatchedThePattern = (): boolean => {
    return this.hasMatchedLowercase || this.hasMatchedUppercase;
  };

  /**
   * Returns a random consonant from the next Random number
   *
   * @param   {boolean}  asCapital  When true, will be returned as an uppercase letter
   */
  private pickConsonant = (asCapital?: boolean): string => {
    return this.getRandomLetter(config.consonants, asCapital);
  };

  /**
   * Returns a random vowel from the next Random number
   *
   * @param   {boolean}  asCapital  When true, will be returned as an uppercase letter
   */
  private pickVowel = (asCapital?: boolean): string => {
    return this.getRandomLetter(config.vowels, asCapital);
  };

  /**
   * Initiates the simple character processor - defined pattern / case matching
   *
   * @param   {string}  letter  Currently processed character
   */
  private processCharacter = (letter: string): void => {
    this.hasMatchedLowercase = config.casingPatterns.lower.test(letter);
    this.hasMatchedUppercase = config.casingPatterns.upper.test(letter);

    this.isCapital = this.hasMatchedUppercase;
  };

  /**
   * Resets the internal flags/values for the next incoming letter
   */
  private reset = (): void => {
    this.isCapital = false;
    this.result = "";
    this.hasMatchedLowercase = false;
    this.hasMatchedUppercase = false;
    this.rng.reset();
  };
}

export const NameGenerator = new Generator();
