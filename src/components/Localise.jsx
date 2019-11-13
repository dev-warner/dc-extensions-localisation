import React, { useState } from "react";

import { translate } from "../hooks/translate";
import { useLocales } from "../hooks/setValue";
import { defaultValuesFactory } from "../utils/defaultValues";

import { Input } from "./Input";
import { Button } from "./Button";

export function Localise({ sdk, value }) {
  const defaultValues = defaultValuesFactory(sdk);
  const [translated, setTranslated] = useState(defaultValues(value));
  const [text, setText] = useState([]);

  useLocales(sdk, translated);

  async function translateText() {
    try {
      const locales = sdk.locales.available.map(({ language }) => language);

      const { data } = await translate({
        text,
        locales
      });

      const translations = data.reduce((acc, value) => {
        return Object.assign(acc, { [value.locale]: value.text });
      }, {});

      setTranslated(translations);
    } catch (e) {
      console.error("couldnt translate");
    }
  }

  function getTranslated(lang) {
    return translated[lang];
  }

  function updateTranslated(lang, value) {
    const updated = Object.assign({}, translated, { [lang]: value });

    setTranslated(updated);
  }

  return (
    <>
      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        label={"Type text to translate here"}
      />
      <Button onClick={translateText} label={'Click to translate'}/>
      {sdk.locales.available.map(({ locale, language }) => (
        <Input
          key={language}
          value={getTranslated(language)}
          onChange={e => updateTranslated(language, e.target.value)}
          label={locale}
        />
      ))}
    </>
  );
}
