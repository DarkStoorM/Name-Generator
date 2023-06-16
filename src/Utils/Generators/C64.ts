import { IRNG } from "../Interfaces/IRNG";

/**
 * JS interpretation of Boulder Dash PRNG.
 *
 * This has been minified and reformatted from some online version, which was translated from
 * Basic to C, then to JavaScript and minified ¯\_(ツ)_/¯
 */
export class C64 implements IRNG {
  /**
   * Lower bit of the state
   */
  private randSeed1 = 0;

  /**
   * The initial state stored for reset purposes
   */
  public initialState = 0;
  /**
   * Current State
   */
  public state = 0;

  constructor(state: number) {
    this.state = state;
    this.initialState = state;
  }

  public static makePseudoSeed = (): number => {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  };

  public next = (): number => {
    let t, e;
    const s = 128 * (1 & this.randSeed1);
    const d = (this.state >> 1) & 127;

    return (
      (t = (e = this.state + 128 * (1 & this.state)) > 255 ? 1 : 0),
      (t = (e = (e &= 255) + t + 19) > 255 ? 1 : 0),
      (this.state = 255 & e),
      (t = (e = this.randSeed1 + t + s) > 255 ? 1 : 0),
      (e = (e &= 255) + t + d),
      (this.randSeed1 = 255 & e),
      this.randSeed1
    );
  };

  public reset = (): void => {
    this.state = this.initialState;
    // The lower bit of the state has to be reset to zero, because it's changing at runtime and
    // when we only reset the initial state, we end up having a different number, being unable
    // to recreate the next() from the initial state
    this.randSeed1 = 0;
  };
}
