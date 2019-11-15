import React from 'react';
import { Input } from './Input';

export function InputList({ locales, getTranslated, updateTranslated, setLockedLocale, locked, readOnly }) {
  return (
    locales.map(({ locale, language }) => {
      return (
        <Input
          checkbox={true}
          label={locale}
          key={language}
          readOnly={readOnly}
          locked={locked[language]}
          value={getTranslated(language)}
          setLocked={setLockedLocale(language)}
          onChange={e => updateTranslated(language, e.target.value, locked[language])}
        />
      );
    })
  );
}
