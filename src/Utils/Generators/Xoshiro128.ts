import { BaseNumberGenerator } from "./BaseNumberGenerator";

export class Xoshiro128 extends BaseNumberGenerator {
  private state1 = 0;
  private state2 = 0;
  private state3 = 0;
  private state4 = 0;

  public constructor() {
    super();

    this.init();
  }

  public init(): void {
    this.state1 = this.hashedSeed[0];
    this.state2 = this.hashedSeed[1];
    this.state3 = this.hashedSeed[2];
    this.state4 = this.hashedSeed[3];
  }

  public next(lettersTable: string): number {
    let t = this.state2 << 9;
    let r = this.state2 * 5;

    r = ((r << 7) | (r >>> 25)) * 9;

    this.state3 ^= this.state1;
    this.state4 ^= this.state2;
    this.state2 ^= this.state3;
    this.state1 ^= this.state4;
    this.state3 ^= t;
    this.state4 = (this.state4 << 11) | (this.state4 >>> 21);
    return (((r >>> 0) / 4294967296) * lettersTable.length) >>> 0;
  }

  public reset(): void {
    this.init();
  }
}
