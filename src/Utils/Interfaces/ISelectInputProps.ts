export interface ISelectInputProps {
  /**
   * DOM element id to match the label with
   */
  elementId: string;
  /**
   * Text to display in the label of this input
   */
  elementLabelText: string;
  /**
   * React reference to this select input element
   */
  elementReference: React.LegacyRef<HTMLSelectElement> | undefined;
  /**
   * Handler function to fire on this select input change
   */
  onChangeSelectHandler: React.ChangeEventHandler<HTMLSelectElement> | undefined;
}
