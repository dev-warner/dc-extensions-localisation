import api from '../utils/api';


export async function translate({ text, locales }) {
  try {
    const translation = await api.post('translate', {text, locales});

    return translation;
  }
  catch(e) {
    throw new Error('failed')
  }
}