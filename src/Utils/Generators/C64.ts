import { BaseNumberGenerator } from "./BaseNumberGenerator";

/**
 * JS interpretation of Boulder Dash PRNG.
 *
 * This has been minified and reformatted from some online version, which was translated from
 * Basic to C, then to JavaScript and minified ¯\_(ツ)_/¯
 */
export class C64 extends BaseNumberGenerator {
  /**
   * Lower bit of the state
   */
  private randSeed1 = 0;

  constructor() {
    super();
  }

  public override next(lettersTable: string): number {
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
      this.randSeed1 % lettersTable.length
    );
  }

  public override reset(): void {
    this.randSeed1 = 0;
  }
}
