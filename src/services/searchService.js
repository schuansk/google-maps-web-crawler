const puppeteer = require('puppeteer-extra');

const navigations = require('../utils/navigations');
const populateService = require('../services/populateService');
const getResults = require('../utils/getResults');
const logRepository = require('../repositories/logRepository');
const logGenerator = require('../utils/logGenerator');

async function engine(datas, term, city, state, fullStateName) {
  const iPhone = puppeteer.pptr.devices['iPhone 6'];
  const chromiumWindowIsHidden = process.env.HIDE_WINDOW === 'false' ? false : true;
  let resultsAdded, updatedResults;
  
  const browser = await puppeteer.launch(
    { 
      headless: chromiumWindowIsHidden, 
      devtools: true,
    }
  );

  try {
    const log = await logRepository.save({
      city,
      state,
      situation: 'started',
    });
  
    try {
      logGenerator.saveLog(`[Starting search] ${term} | ${city}-${state}`);

      const page = await browser.newPage();
  
      const searchArgument = `${term} na cidade de ${city}, ${state}`;
  
      await page.setDefaultNavigationTimeout(0);
      await page.goto(`https:/www.google.com`, {waitUntil: 'networkidle2'});
  
      await page.type('.gLFyf', searchArgument);
  
      await page.keyboard.down('Enter');
      await page.waitForNavigation();
      await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
    
      await page.emulate(iPhone);
      const resultsPage = await navigations.seeItAll(page, '.vQxBw');
    
      if (resultsPage) {
        await getResults.get(resultsPage, term, datas, city, state, fullStateName);
    
        if(datas.length > 0) {
          const { added, updated } = await populateService.database(datas);
          resultsAdded = added;
          updatedResults = updated;  
        }  
      }
  
      await logRepository.update(log.id, {
        city,
        state,
        resultsAdded,
        updatedResults,
        situation: 'completed',
      });
    } catch (e) {
      await logRepository.update(log.id, {
        city,
        state,
        situation: 'error',
      });

      logGenerator.saveLog(`[Error] ${term} | ${city}-${state}`);
    }
  } catch(err){
    console.log(`error: ${err}`);
  }
  
  await browser.close();
};

module.exports = {
  engine: engine,
}
