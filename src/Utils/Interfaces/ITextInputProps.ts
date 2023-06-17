export interface ITextInputProps {
  /**
   * Default value to display in this input
   */
  defaultValue: number | string;
  /**
   * DOM element id to match the label with
   */
  elementId: string;
  /**
   * Text to display in the label of this input
   */
  elementLabelText: string;
  /**
   * Which BEM modifier class to apply
   *
   * - counter = smaller input
   * - template = bigger input
   */
  elementModifierClassType: "counter" | "template";
  /**
   * React reference to this input element
   */
  elementReference: React.LegacyRef<HTMLInputElement> | undefined;
  /**
   * Maximum size of this input in characters
   */
  maxInputLength: number;
  /**
   * Handler function to fire on this input change
   */
  onChangeInputHandler: React.ChangeEventHandler<HTMLInputElement> | undefined;
}
