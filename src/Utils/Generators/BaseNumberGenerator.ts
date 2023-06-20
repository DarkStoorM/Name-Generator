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
  protected hashedSeed: [number, number, number, number] = [0, 0, 0, 0];

  constructor() {
    this.createSeed();

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
   * Creates and stores a set of initial states for seeding
   */
  private createSeed(): void {
    this.hash();

    const newSeed = this.hashedSeed[0];

    this.initialState = newSeed;
    this.state = newSeed;
  }

  /**
   * Creates a set of states to seed random number generators
   */
  protected hash(): void {
    const str = Math.random().toString(36).substr(2);

    let h1 = 1779033703;
    let h2 = 3144134277;
    let h3 = 1013904242;
    let h4 = 2773480762;

    for (let i = 0, k; i < str.length; i++) {
      k = str.charCodeAt(i);
      h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
      h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
      h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
      h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }

    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);

    this.hashedSeed = [(h1 ^ h2 ^ h3 ^ h4) >>> 0, (h2 ^ h1) >>> 0, (h3 ^ h1) >>> 0, (h4 ^ h1) >>> 0];
  }
}
