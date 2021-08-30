const { GoogleSpreadsheet } = require('google-spreadsheet');
const resultsRepository = require('../repositories/resultsRepository');

async function updateSpreadsheet() {
  const key = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n');
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: key,
  });

  await doc.loadInfo();
   
  const sheet = doc.sheetsByTitle['main'];
  sheet && await sheet.delete();

  const newSheet = await doc.addSheet(
    { 
      title: 'main',
      headerValues: 
      [
        '_id',
        'name', 
        'location', 
        'address', 
        'city', 
        'state', 
        'phoneNumber',
      ],
    },
  );

  const results = await resultsRepository.find();

  await newSheet.addRows(results);
};

module.exports = {
  updateSpreadsheet:updateSpreadsheet
};
