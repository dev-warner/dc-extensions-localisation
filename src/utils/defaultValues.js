export function defaultValues(locales, initalValue) {
    const values = locales.reduce((acc, value) => {
        if (initalValue && initalValue.values && initalValue.values.length) {
            const text = (
              initalValue.values.find(
                  ({ locale }) => value.locale === locale
              ) ||
              ''
            );

            return Object.assign(acc, { [value.locale]: text.value });
        }

        return Object.assign(acc, { [value.locale]: '' });
    }, {});

    return values;
}
