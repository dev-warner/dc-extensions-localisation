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

  return locales.map(({ locale }) => {
    const locked = isLocked(locale);

    return (
      <Input
        key={locale}
        label={locales}
        value={getTranslated(locale)}
        disabled={locked || readOnly}
        multiline={true}
        onChange={e => updateTranslated(
          locale,
          e.target.value,
          locked
        )}
        InputProps={{
          endAdornment: (
            <Lock
              locked={locked}
              onClick={setLockedLocale(locale)}
            />
          )
        }}
      />
    )
  })
}
