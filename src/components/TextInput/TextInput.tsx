import { ITextInputProps } from "../../Utils/Interfaces/ITextInputProps";
import "./TextInput.scss";

export function TextInput({
  elementId,
  elementLabelText,
  elementModifierClassType,
  onChangeInputHandler,
  elementReference,
  maxInputLength,
  defaultValue,
}: ITextInputProps) {
  return (
    <>
      <input
        autoComplete="off"
        className={"text-input--" + elementModifierClassType}
        id={elementId}
        onChange={onChangeInputHandler}
        ref={elementReference}
        maxLength={maxInputLength}
        type="text"
        value={defaultValue}
      />
      <label htmlFor={elementId}>{elementLabelText}</label>
    </>
  );
}
