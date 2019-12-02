import React from 'react';

import { Lock } from './Lock';
import { Input } from './Input';

export function LocaleList({
  locales,
  isLocked,
  readOnly,
  getTranslated,
  setLockedLocale,
  updateTranslated
}) {

  return locales.map(({ locale, language }) => {
    const locked = isLocked(language);

    return (
      <Input
        key={language}
        label={locale}
        value={getTranslated(language)}
        disabled={locked || readOnly}
        onChange={e => updateTranslated(
          language,
          e.target.value,
          locked
        )}
        InputProps={{
          endAdornment: (
            <Lock
              locked={locked}
              onClick={setLockedLocale(language)}
            />
          )
        }}
      />
    )
  })
}
