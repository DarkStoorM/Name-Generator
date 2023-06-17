import { TNumberGenerator } from "../Types/TNumberGenerator";

export interface IConfig {
  /**
   * Regular Expression patterns used for matching letter casing
   *
   * @default /aA/ | /bB/
   */
  casingPatterns: {
    lower: RegExp;
    upper: RegExp;
  };
  /**
   * Table of Consonants
   */
  consonants: string;
  /**
   * Default number of names to display on the page
   */
  defaultNamesCount: number;
  /**
   * Default template string to put in the input template field
   */
  defaultTemplate: string;
  /**
   * Size of the input field in characters
   */
  maximumCounterInputSize: number;
  /**
   * Defines how long the generated names can be
   */
  maximumNameLength: number;
  /**
   * Defines the maximum number of names that can be generated on the page
   */
  maximumNamesCount: number;
  /**
   * Defines how long the template string can be
   */
  maximumTemplateInputSize: number;
  /**
   * Template class of a custom (pseudo) Random Number Generator used by the name generator
   *
   * @default Mulberry32
   */
  numberGenerator: TNumberGenerator;
  /**
   * Table of Vowels
   */
  vowels: string;
}
