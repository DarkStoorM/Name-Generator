import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { NameGenerator, config } from "../../NameGenerator";
import { Numbers } from "../../Utils/Numbers";
import { NamesList } from "../NamesList/NamesList";

type FormEvent = React.FormEvent<HTMLInputElement | HTMLFormElement>;

export const App: React.FC = () => {
  const [result, setResult] = useState<string[]>([]);
  const [namesCount, setNamesCount] = useState(config.defaultNamesCount);
  const template = useRef<HTMLInputElement>(null);
  const countInput = useRef<HTMLInputElement>(null);

  function handleRegenerate(event: FormEvent) {
    NameGenerator.createGenerators();
    event.preventDefault();

    generateResult();
  }

  function handleChange(event: FormEvent) {
    event.preventDefault();

    generateResult();
  }

  function handleCounterChange(event: FormEvent): void {
    event.preventDefault();

    let count = Number(countInput.current?.value ?? 1);

    // Clamp between 1 - 30, no need to render more
    count = Numbers.clamp(count, 1, 30);

    setNamesCount(count);
  }

  // Otherwise it won't work immediately when changing the count ¯\_(ツ)_/¯
  const generateResult = useCallback(() => {
    const inputString = template.current?.value;

    if (!inputString) {
      return;
    }

    setResult(
      Array.from({ length: namesCount }, (value, index) => {
        return NameGenerator.generateName(inputString, index);
      })
    );
  }, [namesCount]);

  useEffect(() => {
    generateResult();
  }, [generateResult, namesCount]);

  return (
    <div>
      <form onSubmit={handleRegenerate}>
        <input type="text" ref={countInput} onChange={handleCounterChange} value={namesCount} />
        <input type="text" ref={template} onChange={handleChange} value={template.current?.value ?? "Ababbab"} />
        <NamesList names={result} />
        <button></button>
      </form>
    </div>
  );
};
