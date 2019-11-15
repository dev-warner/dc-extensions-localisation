import api from '../utils/api';
import { useState } from 'react';
import { defaultValuesFactory } from '../utils/defaultValues';


async function translate({ text, locales }) {
  try {
    const translation = await api.post('translate', {text, locales});

    return translation;
  }
  catch(e) {
    throw new Error('failed')
  }
}


export function useTranslation(sdk, value, text, locked) {
  const defaultValues = defaultValuesFactory(sdk);
  const [translated, setTranslated] = useState(defaultValues(value));
  
  async function translateText() {
    try {
      const locales = sdk.locales.available.map(({ language }) => language);
  
      const { data } = await translate({
        text,
        locales
      });
  
      const translations = data.reduce((acc, fetched) => {
        const complete = locked[fetched.locale] ? getTranslated(fetched.locale) : fetched.text;

        return Object.assign(acc, {
          [fetched.locale]: complete
        });
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

  return {
    translated,
    translate: translateText,
    actions:{ updateTranslated, getTranslated }
  }
}