
import util from 'util'
import yandex from 'yandex-translate';

const translator = yandex(process.env.KEY);
const translateText = util.promisify(translator.translate);

async function translate(event, context) {
  try {
    if (event.httpMethod !== 'POST') {
      throw new Error('Unexpected request');
    }
    const body = JSON.parse(event.body);

    const promises = body.locales.map(async (locale) => {
      const translated = await translateText(body.text, { to: locale });

      if(translated.code !== 200) {
        return fail(locale)
      }
      return success(translated, locale)
    })
    const results = await Promise.all(promises)

    return {
      statusCode: 200,
      body: JSON.stringify(results)
    }
  }
  catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify(e.message)
    }
  }
}

export const handler = translate;

function fail(locale) {
  return {
    text: '',
    locale
  };
}

function success(translated, locale) {
  return {
    text: translated.text[0],
    locale
  };
}
