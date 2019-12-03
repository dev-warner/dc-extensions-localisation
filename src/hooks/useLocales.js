import { useEffect, useContext, useCallback } from 'react';
import { ExtensionContext } from '../components/ExtensionProvider';

const schema = 'http://bigcontent.io/cms/schema/v1/core#/definitions/localized-value';

export function useLocales(translated) {
    const sdk = useContext(ExtensionContext);
    const { field } = sdk;

    const setValue = useCallback(async () => {
        if (!translated) return;

        const values = Object.keys(translated).map(locale => ({
            locale,
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
    }, [field, translated]);

    useEffect(() => { setValue() }, [translated, setValue]);
}
