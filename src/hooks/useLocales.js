import { useEffect, useContext, useCallback } from 'react';
import { ExtensionContext } from '../components/ExtensionProvider';

const schema = 'http://bigcontent.io/cms/schema/v1/core#/definitions/localized-value';

export function useLocales(translated) {
    const sdk = useContext(ExtensionContext);
    const { locales: { available: locales } } = sdk;
    const { field } = sdk;

    const setValue = useCallback(async () => {
        if (!translated) return;

        const getCodeFromLang = value => {
            const available = (
                locales.find(({ language }) => language === value) ||
                {}
            );

            return available.locale;
        };

        const values = Object.keys(translated).map(locale => ({
            locale: getCodeFromLang(locale),
            value: translated[locale]
        }));

        try {
            const data = {
                values,
                _meta: {
                    schema
                }
            };
            await field.setValue(data);
        }
        catch (e) {
            console.log('Unable to set value');
        }
    }, [field, locales, translated]);

    useEffect(() => { setValue() }, [translated, setValue]);
}
