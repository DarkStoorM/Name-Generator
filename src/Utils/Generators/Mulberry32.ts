import { IRNG } from "../Interfaces/IRNG";

export class Mulberry32 implements IRNG {
  public initialState = 0;
  public state = 0;

  constructor(state: number) {
    this.state = state;
    this.initialState = state;
  }

  public static makePseudoSeed = (): number => {
    return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
  };

  public next = (lettersTable: string): number => {
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
  };

  public reset = (): void => {
    this.state = this.initialState;
  };
}
