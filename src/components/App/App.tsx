import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import "./App.scss";
import "./InputForm.scss";
import { NameGenerator } from "../../NameGenerator";
import { Numbers } from "../../Utils/Numbers";
import { TIndexedNumberGenerators } from "../../Utils/Types/TIndexedNumberGenerators";
import { config } from "../../Utils/config";
import { Button } from "../Button/Button";
import { Description } from "../Layout/Description/Description";
import { Header } from "../Layout/Header/Header";
import { NamesList } from "../NamesList/NamesList";
import { Select } from "../Select/Select";
import { TextInput } from "../TextInput/TextInput";

export function App() {
  const [result, setResult] = useState<string[]>([]);
  const [namesCount, setNamesCount] = useState(config.defaultNamesCount);
  const template = useRef<HTMLInputElement>(null);
  const countInput = useRef<HTMLInputElement>(null);
  const generatorInput = useRef<HTMLSelectElement>(null);

  function handleRegenerate(event: FormEvent) {
    event.preventDefault();

    // Clicking Regenerate should make a new set of generator instances
    // Only the input change should not affect the generators array
    NameGenerator.createGenerators();

    generateResult();
  }

  function handleChange(event: FormEvent) {
    event.preventDefault();

    generateResult();
  }

  /**
   * Converts the input string from
   */
  function handleCounterChange(event: FormEvent): void {
    event.preventDefault();

    let count = Number(countInput.current?.value);

    if (Number.isNaN(count)) {
      setNamesCount(0);
      return;
    }

    count = Numbers.clamp(count, 0, config.maximumNamesCount);

    setNamesCount(count);
  }

  // Otherwise it won't work immediately when changing the count ¯\_(ツ)_/¯
  const generateResult = useCallback(() => {
    const inputString = template.current?.value;

    if (!inputString) {
      setResult([]);

      return;
    }

    setResult(
      Array.from({ length: namesCount }, (value, index) => {
        return NameGenerator.generateName(inputString, index);
      }).filter((result) => {
        // Remove all empty results if only illegal characters were present so the NamesList
        // component doesn't have to refilter the results after setting the state
        return result.length !== 0;
      })
    );
  }, [namesCount]);

  useEffect(() => {
    generateResult();
  }, [generateResult, namesCount]);

  function handleSelection() {
    const generatorIndex = generatorInput.current?.value;

    if (!generatorIndex) {
      throw new Error("??");
    }

    config.changeGenerator(generatorIndex as TIndexedNumberGenerators);
    NameGenerator.createGenerators();

    generateResult();
  }

  return (
    <div className="container">
      <Header />
      <Description />
      <form className="input-form" onSubmit={handleRegenerate}>
        <div className="input-form__inputs">
          <div className="input-form__inputs__container input-form__inputs__container__counter">
            <TextInput
              defaultValue={namesCount}
              elementId="count"
              elementLabelText="Count"
              elementModifierClassType="counter"
              elementReference={countInput}
              maxInputLength={config.maximumCounterInputSize}
              onChangeInputHandler={handleCounterChange}
            />
          </div>
          <div className="input-form__inputs__container input-form__inputs__container__template">
            <TextInput
              defaultValue={template.current?.value ?? config.defaultTemplate}
              elementId="template"
              elementLabelText="Template"
              elementModifierClassType="template"
              elementReference={template}
              maxInputLength={config.maximumTemplateInputSize}
              onChangeInputHandler={handleChange}
            />
          </div>
          <div className="input-form__inputs__container input-form__inputs__container__template">
            <Select
              elementId="generator-selection"
              elementLabelText="algorithm"
              elementReference={generatorInput}
              onChangeSelectHandler={handleSelection}
            />
          </div>
          <div className="input-form__inputs__container input-form__inputs__container__button">
            <Button text="regenerate" />
          </div>
        </div>
        <NamesList names={result} />
      </form>
    </div>
  );
}
