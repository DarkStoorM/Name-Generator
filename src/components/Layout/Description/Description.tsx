import { config } from "../../../Utils/config";
import "./Description.scss";

export function Description() {
  return (
    <div className="description">
      <div>
        <div>
          <b>aA</b> - lower/upper vowels
        </div>
        <div>
          <b>bB</b> - lower/upper consonants
        </div>
      </div>
      <div>
        <b>example template</b> - {config.defaultTemplate}
      </div>
    </div>
  );
}
