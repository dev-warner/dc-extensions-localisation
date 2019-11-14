import { useState } from 'react';
import { useForceUpdate } from './forceUpdate';

function defaultLocked(sdk) {
  return sdk.locales.available.reduce(
    (acc, val) => Object.assign(acc, { [val.language]: false }),
    {}
  );
}

export function useLocked(sdk) {
  const update = useForceUpdate();
  const [locked, setLocked] = useState(defaultLocked(sdk));

  function setLockedLocale(locale) {
    return () => {
      setLocked(Object.assign(locked, { [locale]: !locked[locale] }));
      update();
    };
  }

  return {
    setLockedLocale,
    locked
  }
}
