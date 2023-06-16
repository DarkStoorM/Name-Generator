export interface IRNG {
  /**
   * The initial state stored for reset purposes
   */
  initialState: number;
  /**
   * Current State
   */
  state: number;
  /**
   * Returns the next random number counting from initial state
   *
   * `IMPORTANT NOTE`: Each PRNG class should appropriately implement `next()` method, which should
   * return a random number from 0 to `lettersTable`'s length, otherwise the application's behavior
   * will be unexpected
   *
   * @param   {string}  lettersTable  Letters table to pick a random letter from - consonants or vowels
   */
  next(lettersTable: string): number;
  /**
   * Resets the internals
   *
   * `IMPORTANT NOTE`: if the custom class implements an additional state, this method should take
   * this into consideration and reset it. Example, C64 PRNG implements High / Low bytes, where
   * only the lower byte is used and has to be reset
   */
  reset(): void;
}
