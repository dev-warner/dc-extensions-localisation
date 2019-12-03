import { useState } from 'react';
import { useForceUpdate } from './forceUpdate';

function defaultLocked(locales, value = false) {
    return locales.reduce(
        (acc, val) => Object.assign(acc, { [val.locale]: value }),
        {}
    );
}

export function useLocked(locales) {
    const update = useForceUpdate();
    const [locked, setLocked] = useState(defaultLocked(locales));

    function setLockedLocale(locale) {
        return () => {
            setLocked(Object.assign(locked, { [locale]: !isLocked(locale) }));
            update();
        };
    }

    function lockAll() {
        setLocked(defaultLocked(locales, true));
    }

    function isLocked(language) {
        return locked[language];
    }

    return {
        setLockedLocale,
        isLocked,
        lockAll,
        locked
    };
}
