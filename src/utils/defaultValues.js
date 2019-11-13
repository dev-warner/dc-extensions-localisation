
export function defaultValuesFactory(sdk) {
  return (initalValue) => defaultValues(sdk, initalValue);
}

function defaultValues(sdk, initalValue) {
  const values = sdk.locales.available.reduce((acc, value) => {
    if (initalValue && initalValue.values && initalValue.values.length) {
      const text = initalValue.values.find(({locale}) => value.locale === locale) || '';

      return Object.assign(acc, {[value.language]: text.value})
    }

    return Object.assign(acc, {[value.language]: ''})
   } , {})

   return values;
}