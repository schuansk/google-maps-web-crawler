const { GoogleSpreadsheet } = require('google-spreadsheet');
const resultsRepository = require('../repositories/resultsRepository');

async function exportCompleteData() {
  const key = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n');
  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);
  
  const now = new Date;
  const exportDate = `${now.getDate()}_${now.getMonth()}_${now.getFullYear()}_${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}`;
  
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: key,
  });

  const sheet = await doc.addSheet(
    { 
      title: `export_${exportDate}`,
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

  await sheet.addRows(results);
};

module.exports = {
  exportCompleteData:exportCompleteData
};
