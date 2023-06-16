import { INameListingProps } from "../../Utils/Interfaces/INameListingProps";
import "./NamesList.scss";

export function NamesList({ names }: INameListingProps) {
  return (
    <div className="names-list">
      {names.map((name) => (
        <div key={crypto.randomUUID()} className="names-list__cell">
          {name}
        </div>
      ))}
    </div>
  );
}
