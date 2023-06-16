export interface IRNG {
  /**
   * The initial state stored for reset purposes
   */
  initialState: number;
  /**
   * Current State
   */
  state: number;
  next(): number;
  /**
   * Resets the internals
   */
  reset(): void;
}
