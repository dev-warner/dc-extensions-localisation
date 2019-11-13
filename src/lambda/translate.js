
async function translate(event, context) {
  try {
    if (event.httpMethod !== 'POST') {
      throw new Error('Unexpected request');
    }
  
    const body = JSON.parse(event.body);
  
    return {
      statusCode: 200,
      body: JSON.stringify(body)
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