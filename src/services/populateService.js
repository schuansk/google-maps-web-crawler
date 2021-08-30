const { GoogleSpreadsheet } = require('google-spreadsheet');
const resultsRepository = require('../repositories/resultsRepository');

async function spreadsheet(datas) {
  const key = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n')

  const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: key,
  });

  await doc.loadInfo();  
  const sheet = doc.sheetsByIndex[0];

  await sheet.addRows(datas);
};

async function database(datas) {
  let added = 0;
  let updated = 0;

  for(let i = 0; i < datas.length; i++) {
    const addressExists = await resultsRepository.findByAddress(datas[i].address);
    
    if(!addressExists) {
      if(datas[i].address === '') {
        const phoneNumberExists = await resultsRepository.findByPhoneNumber(datas[i].phoneNumber);
        
        if(phoneNumberExists) {
          await resultsRepository.save(datas[i]);
          added++;
        }
      } else {
        await resultsRepository.save(datas[i]);
        added++;
      }
    } else {
      if (addressExists.city !== datas[i].city && addressExists.city === '') {
        await resultsRepository.remove(addressExists._id);
        await resultsRepository.save(datas[i]);
        updated++;
      }
    }
  }

  return { added, updated };
};

module.exports = {
  spreadsheet: spreadsheet,
  database: database,
}