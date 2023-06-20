import { BaseNumberGenerator } from "./BaseNumberGenerator";

export class MultiplyWithCarry extends BaseNumberGenerator {
  private state1 = 0;
  private state2 = 0;
  private mask = 0xffffffff;

  constructor() {
    super();

    this.init();
  }

  /**
   * Custom function to modify the initial states of this class
   */
  public init(): void {
    this.state1 = (this.hashedSeed[1] + this.initialState) & this.mask;
    this.state2 = (this.hashedSeed[2] - this.initialState) & this.mask;
  }

  public next(lettersTable: string): number {
    this.state2 = (36969 * (this.state2 & 65535) + (this.state2 >> 16)) & this.mask;
    this.state1 = (18000 * (this.state1 & 65535) + (this.state1 >> 16)) & this.mask;

    let result = ((this.state2 << 16) + (this.state1 & 65535)) >>> 0;
    result /= 4294967296;

    return (result * lettersTable.length) >>> 0;
  }

  public reset(): void {
    this.init();
  }
}
