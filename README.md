## Google Maps Web Crawler

![Google Maps web crawler icon](https://i.ibb.co/YRL6kRB/crawler.png)
## About
This is a web crawler built on NodeJS using the [Puppeteer](https://github.com/puppeteer/puppeteer) library to get data from businesses listed on Google Maps in a particular region.
## Requirements
 - [MongoDB](https://www.mongodb.com/).
## Recommended
 - [Yarn](https://yarnpkg.com/).
 - [Google Chromium](https://www.chromium.org/).
 - [Google Service Account](https://cloud.google.com/iam/docs/service-accounts) (This is for exporting MongoDB data to a Google Spreadsheet).

## How to configure
Copy the renamed `.env.example` file to `.env`.
  
    cp .env.example .env
In the .env file, add the Google API settings as defined in [Google developer's console](https://console.developers.google.com/).
You can choose whether to show the window in Google Chromium by changing the value of `HIDE WINDOW` to `true` or `false`.
In `SPREADSHEET_ID`, enter the ID of the Google Spreadsheet you want to use to export the data.
The `TOKEN` can be any string without spaces that guarantee security in the request, I recommend using a **UUID** or **MD5**.
In `MONGO_CONNECTION_STRING`, add the MongoDB connection URL, for example: `mongodb://localhost:27017`.
## How to run
Run on your terminal `yarn dev` or `npm run dev`.
## How to use
The route `/crawler/:your_token` receives a body in JSON format with the search term and location, for example:
```javascript
{
	"term": "brechó",
	"estados": [
	{
		"sigla": "SP",
		"nome": "São Paulo",
		"cidades": [
			"São José dos Campos", 
			"Taubaté"
			]
		}
	]
}
```
If the request is successful, the message **Starting process** will be returned and the process will take place in the background.
The route `/export/complete/:your_token` has nobody and exports data from MongoDB to the Google Spreadsheet
As for other routes? Have fun discovering and testing them.
## Notices
Sometimes Google may request a "I'm not a robot" conference, unfortunately, there's nothing that can be done.
## Tips
Use logs to track crawler progress.
## To do
 - Implement the Docker.
 - Improve data acquisition time.
 - Add route documentation.
 - Universalize to the search language.