import { useState, useContext } from 'react';
import { translateFactory } from '../utils/translate';
import { defaultValues } from '../utils/defaultValues';
import { ExtensionContext } from '../components/ExtensionProvider';

export function useTranslation(text, locked, lockAll, initalValue) {
    const sdk = useContext(ExtensionContext);

    const { locales, params } = sdk;
    const { installation } = params;
    const { available: availableLocales } = locales;

    const [translated, setTranslated] = useState(
        defaultValues(availableLocales, initalValue)
    );
    const translate = translateFactory(
        installation.TRANSLATION_API_KEY,
        getTranslated
    );

    async function translateText() {
        try {
            const translations = await translate(
                availableLocales,
                text,
                locked
            );

            setTranslated(translations);
            lockAll();
        } catch (e) {
            console.error('couldnt translate');
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
        actions: { updateTranslated, getTranslated }
    };
}
