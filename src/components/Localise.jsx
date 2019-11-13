import React from "react";

import { useTranslation } from "../hooks/translate";
import { useLocales } from "../hooks/setValue";

import { Input } from "./Input";
import { Button } from "./Button";

export function Localise({ sdk, initalData }) {
  const {
    text,
    setText,
    translated,
    translateText,
    getTranslated,
    updateTranslated,
  } = useTranslation(sdk, initalData)
  useLocales(sdk, translated);

  return (
    <>
      <Input
        value={text}
        onChange={e => setText(e.target.value)}
        label={"Type text to translate here"}
      />
      <Button onClick={translateText} label={"Click to translate"} />
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
