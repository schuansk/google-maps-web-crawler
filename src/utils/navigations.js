const puppeteer = require('puppeteer-extra');
const scroll = require('./scroll');
const getDetails = require('./getDatails');

async function seeItAll(page, selector) {
  const button = await page.$(selector);
  
  if (button) {
    await button.click();
    await page.waitForTimeout(selector, 5000).then(() => () => {console.log('timeout')});
    await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
    await scroll.auto(page);
    return page;
  } else {
    return false;
  }
}

async function toTheDetails(url, datas, city, state, fullStateName) {
  console.log(url)
  const iPhone = puppeteer.pptr.devices['iPhone 6'];
  const chromiumWindowIsHidden = process.env.HIDE_WINDOW === 'false' ? false : true;

  const browser = await puppeteer.launch(
    { 
      headless: chromiumWindowIsHidden, 
      devtools: true,
    }
  );

  const page = await browser.newPage();
  await page.emulate(iPhone);

  await page.setDefaultNavigationTimeout(0);
  await page.goto(`${url}`, {waitUntil: 'networkidle2'});
  await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });

  await getDetails.get(page, datas, city, state, fullStateName);

  await browser.close();
}

module.exports = {
  seeItAll:seeItAll,
  toTheDetails:toTheDetails,
}