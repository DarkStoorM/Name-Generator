import { BaseNumberGenerator } from "./BaseNumberGenerator";

export class JenkinsSmallFast extends BaseNumberGenerator {
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
    this.state1 |= 0;
    this.state2 |= 0;
    this.state3 |= 0;
    this.state4 |= 0;

    let t = (this.state1 - ((this.state2 << 27) | (this.state2 >>> 5))) | 0;

    this.state1 = this.state2 ^ ((this.state3 << 17) | (this.state3 >>> 15));
    this.state2 = (this.state3 + this.state4) | 0;
    this.state3 = (this.state4 + t) | 0;
    this.state4 = (this.state1 + t) | 0;

    return (((this.state4 >>> 0) / 4294967296) * lettersTable.length) >>> 0;
  }

  public reset(): void {
    this.init();
  }
}
