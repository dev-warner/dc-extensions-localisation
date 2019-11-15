# dc-extension-localise

> Translating can be long and painful fast track your inline localisable text with our auto translating custom extension.


## dev

```bash
$ npm run start:all
```

## build

```bash
$ npm run build && npm run build:lambda
```

## deploy

Add an enviroment varible `TRANSLATION_API_KEY` and set it too the API key you generate from [Here](https://translate.yandex.com/developers/keys).


[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/dev-warner/dc-extensions-localisation)


## Register the extension 

- Name your extension
- Add your extension url

### Here is a snippet so you can add your extension easily

```json
{
  "title": "title",
  "description": "description",
  "allOf": [
    {
      "$ref": "http://bigcontent.io/cms/schema/v1/localization#/definitions/localized-string"
    }
  ],
  "ui:extension": {
    "name": "<your name of extension here>"
  }
}
```

## Content Type Schema

Here is a basic schema just including the translate custom extension.
```json
{
	"$schema": "http://json-schema.org/draft-07/schema#",
	"$id": "http://localise.com",

	"title": "Title",
	"description": "Description",

	"allOf": [
		{
			"$ref": "http://bigcontent.io/cms/schema/v1/core#/definitions/content"
		}
	],
	
	"type": "object",
	"properties": {
		"localise": {
			"title": "title",
			"description": "description",
			"allOf": [
				{ "$ref": "http://bigcontent.io/cms/schema/v1/localization#/definitions/localized-string" }
			],
			"ui:extension": {
				"name": "<your name of extension here>"
			}
		}
	},
	"propertyOrder": []
}
```