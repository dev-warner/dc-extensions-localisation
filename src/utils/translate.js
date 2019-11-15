import yandex from 'yandex-translate';

export function translateFactory(key, getTranslated) {
    const translate = translatorFactory(key);

    async function getAllTranslated(text, locales) {
        return Promise.all(locales.map(locale => translate(text, locale)));
    }

    return async (availableLocales, text, locked) => {
        const locales = availableLocales.map(({ language }) => language);

        const translated = await getAllTranslated(text, locales);

        return mapRequestToMap(translated, locked, getTranslated);
    };
}

function translatorFactory(key) {
    const translator = yandex(key);

    return (text, locale) =>
        new Promise(resolve => {
            translator.translate(text, { to: locale }, (err, data) => {
                if (data.code === 502) console.error('Invalid API Key');
                if (data.code !== 200 || err) resolve({ text: '', locale });

                resolve({ text: data.text[0], locale });
            });
        });
}

function mapRequestToMap(translated, locked, getTranslated) {
    return translated.reduce((acc, fetched) => {
        const complete = locked[fetched.locale]
            ? getTranslated(fetched.locale)
            : fetched.text;

        return Object.assign(acc, {
            [fetched.locale]: complete
        });
    }, {});
}
