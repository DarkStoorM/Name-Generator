/* eslint-disable @typescript-eslint/no-unused-vars */

export abstract class BaseNumberGenerator {
  /**
   * The initial state stored for reset purposes
   */
  protected initialState = 0;
  /**
   * Current State
   */
  protected state = 0;

  /**
   * `example`: passing the callback function from inheriting class, which uses an integer as seed
   *
   * ```ts
   * // Usually this should be the same for all implementations
   * super(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
   * ```
   *
   * @param   {number}  seedCallback  Callback function used to seed the new instances on the fly
   */
  constructor(seedCallback: () => number) {
    this.makePseudoSeed(seedCallback);

    // Avoid forcing the inheriting classes to call super.reset() on every reset implementation
    const origin = this.reset;
    this.reset = () => {
      BaseNumberGenerator.prototype.reset.apply(this);
      return origin.apply(this);
    };
  }

  /**
   * Returns the next random number counting from initial state
   *
   * `IMPORTANT NOTE`: Each PRNG class should appropriately implement `next()` method, which should
   * return a random number from 0 to `lettersTable`'s length, otherwise the application's behavior
   * will be unexpected
   *
   * @param   {string}  lettersTable  Letters table to pick a random letter from - consonants or vowels
   * @override
   */
  public next(lettersTable: string): number {
    return 0;
  }

  /**
   * Resets the internals
   *
   * `IMPORTANT NOTE`: if the custom class implements an additional state, this method should take
   * this into consideration and reset it. Example, C64 PRNG implements High / Low bytes, where
   * only the lower byte is used and has to be reset
   * @override
   */
  public reset(): void {
    this.state = this.initialState;
  }

  /**
   * Populates the initial/current state with a number that should be returned by the provided
   * callback to this method
   *
   * @param   {number}  seedCallback  Callback to execute for initialization
   */
  private makePseudoSeed(seedCallback: () => number): void {
    const newSeed = seedCallback();

    this.initialState = newSeed;
    this.state = newSeed;
  }
}
