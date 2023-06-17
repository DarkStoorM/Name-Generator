import { ISelectInputProps } from "../../Utils/Interfaces/ISelectInputProps";
import { availableNumberGenerators, config } from "../../Utils/config";
import "./Select.scss";

export function Select({ elementId, elementLabelText, elementReference, onChangeSelectHandler }: ISelectInputProps) {
  function getSelectOptions() {
    return [...availableNumberGenerators.entries()].map((generator) => {
      return (
        <option key={crypto.randomUUID()} value={generator[0]}>
          {generator[0]}
        </option>
      );
    });
  }

  return (
    <>
      <select id={elementId} onChange={onChangeSelectHandler} ref={elementReference} value={config.currentGenerator}>
        {getSelectOptions()}
      </select>
      <label htmlFor={elementId}>{elementLabelText}</label>
    </>
  );
}
