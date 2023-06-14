import { IButtonProps } from "../../Utils/Interfaces/IButtonProps";
import "./Button.scss";

export function Button({ text }: IButtonProps) {
  return <button className="input-button">{text}</button>;
}
