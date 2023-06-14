export class Numbers {
  /**
   * Clamps the given number in the given range (exclusive)
   *
   * @param   {number}  num  Input number
   * @param   {number}  min
   * @param   {number}  max
   */
  public static clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
  }
}
