import React, { useState } from "react";
import { translate } from "../hooks/translate";
import { defaultValuesFactory } from '../utils/defaultValues';
import { useLocales } from '../hooks/setValue';

export function Localise({ sdk, value }) {
  const defaultValues = defaultValuesFactory(sdk);
  const [translated, setTranslated] = useState(defaultValues(value));
  const [text, setText] = useState([]);

  useLocales(sdk, translated);
  
  async function translateText() {
    try {
      const translations = await translate({
        text,
        locales: sdk.locales.available
      });
  
      setTranslated(translations.data.reduce((acc, value) => Object.assign(acc, {[value.locale]: value.text}, {})));
    }
    catch (e) {
      console.error('couldnt translate');
    }
  }

  function getTranslated(lang) {
    return translated[lang];
  }

  function updateTranslated(lang, value) {
    const updated = Object.assign({}, translated, {[lang]: value});

    setTranslated(updated);
  }

  return (
    <>
      <div className="ampx-input__container">
        <label className="ampx-input__label">Type text to translate here</label>
        <input
          className="ampx-input"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </div>

      <button
        className={"ampx-button ampx-button__primary"}
        onClick={translateText}
      >
        Click to translate
      </button>

      {sdk.locales.available.map(({ locale, language, selected }) => (
        <div className="ampx-input__container" key={language}>
          <label className="ampx-input__label">{locale}</label>
          <input
            className="ampx-input"
            type="text"
            value={getTranslated(language)}
            onChange={e => updateTranslated(language, e.target.value)}
          />
        </div>
      ))}
    </>
  );
}
