import yandex from 'yandex-translate';

export function translateFactory(key, getTranslated) {
    const translate = translatorFactory(key);

    async function getAllTranslated(text, locales) {
        return Promise.all(locales.map(locale => translate(text, locale)));
    }

    return async (availableLocales, text, locked) => {
        const langs = availableLocales.map(({ language, locale }) => ({ language, locale }));

        const translated = await getAllTranslated(text, langs);

        return requestToMap(translated, locked, getTranslated);
    };
}

function translatorFactory(key) {
    const translator = yandex(key);

    return (text, { locale, language }) =>
        new Promise((resolve, reject) => {
            translator.translate(text, { to: language }, (err, data) => {
                if (data.code === 502) reject('Invalid API Key');
                if (data.code !== 200 || err) resolve({ text: '', locale, language });

                resolve({ text: data.text[0], locale, language });
            });
        });
}

function requestToMap(translated, locked, getTranslated) {
    return translated.reduce((acc, fetched) => {
        const complete = locked[fetched.locale]
            ? getTranslated(fetched.locale)
            : fetched.text;

        return Object.assign(acc, {
            [fetched.locale]: complete
        });
    }, {});
}
