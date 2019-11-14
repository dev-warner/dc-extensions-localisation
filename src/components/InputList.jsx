import React from 'react';
import { Input } from './Input';




export function InputList({ sdk, getTranslated, updateTranslated, setLockedLocale, locked }) {
  return (
    sdk.locales.available.map(({ locale, language }) => {
      return (
        <Input
          key={language}
          value={getTranslated(language)}
          onChange={e => updateTranslated(language, e.target.value, locked[language])}
          checkbox={true}
          label={locale}
          locked={locked[language]}
          setLocked={setLockedLocale(language)}
        />
      );
    })
  );
}