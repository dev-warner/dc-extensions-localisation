import { useEffect } from 'react';

export function useLocales(sdk, translated) {
  useEffect(() => { setValue() }, [translated]);

  function getCodeFromLang(value) {
    const available =
      sdk.locales.available.find(({ language }) => language === value) || {};

    return available.locale;
  }

  async function setValue() {
    if (!translated) return;

    const values = (
        Object
          .keys(translated)
          .map(locale => ({
            locale: getCodeFromLang(locale),
            value: translated[locale]
          }))
    );

    try {
      const data = {
        values,
        _meta: {
          schema:
            "http://bigcontent.io/cms/schema/v1/core#/definitions/localized-value"
        }
      };
      console.log(data);
      await sdk.field.setValue(data);
    } catch (e) {
      console.log(e);
    }
  }
}
