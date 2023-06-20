import { BaseNumberGenerator } from "./BaseNumberGenerator";

export class Mulberry32 extends BaseNumberGenerator {
  constructor() {
    super();
  }

  public next(lettersTable: string): number {
    this.state = (this.state + 0x9e3779b9) | 0;
    let z = this.state;
    z ^= z >>> 16;
    z = Math.imul(z, 0x21f0aaad);
    z ^= z >>> 15;
    z = Math.imul(z, 0x735a2d97);
    z ^= z >>> 15;
    this.state = z >>> 0;

    // Since we are converting it to 0 - 1 range, we have to strip the decimals and return int only
    return ((this.state / 0xffffffff) * lettersTable.length) >>> 0;
  }
}
