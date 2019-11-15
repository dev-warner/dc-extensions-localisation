import util from "util";
import dotenv from "dotenv";
import yandex from "yandex-translate";

dotenv.config();

const translator = yandex(process.env.TRANSLATION_API_KEY);
const translateText = util.promisify(translator.translate);

async function translate(event) {
  try {
    if (event.httpMethod === "OPTIONS") {
      return preflight();
    }
    if (event.httpMethod !== "POST") {
      throw new Error("Unexpected request");
    }
    const body = JSON.parse(event.body);
    const promises = body.locales.map(fetchTranslation(body));
    const results = await Promise.all(promises);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(results)
    };
  } catch (e) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify(e.message)
    };
  }
}

const headers = {
  "content-type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT",
  "Access-Control-Allow-Headers": "*"
};

function preflight() {
  return {
    statusCode: 204,
    headers,
    body: JSON.stringify({})
  };
}

function fetchTranslation(body) {
  return async locale => {
    const translated = await translateText(body.text, { to: locale });

    if (translated.code !== 200) {
      return fail(locale);
    }
    return success(translated, locale);
  };
}

function fail(locale) {
  return {
    text: "",
    locale
  };
}

function success(translated, locale) {
  return {
    text: translated.text[0],
    locale
  };
}

export const handler = translate;
