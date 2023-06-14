import { INameListingProps } from "../../Utils/Interfaces/INameListingProps";
import "./NamesList.css";

export function NamesList({ names }: INameListingProps) {
  return (
    <div className="names-list">
      <ul>
        {names.map((name) => (
          <li key={crypto.randomUUID()}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
