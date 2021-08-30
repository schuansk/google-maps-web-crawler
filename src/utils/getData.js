const navigations = require('./navigations');

async function get(page, selector, datas, city, state, fullStateName) {
  const arialLabelContent = process.env.ENVIRONMENT === 'dev' ? 'Compartilhar' : 'Share';
  const shareButton = await page.$(`${selector} > g-scrolling-carousel > .mR2gOd > .EDblX > div > div[aria-label="${arialLabelContent}"]`);
  
  if (shareButton) {
    await shareButton.click();
    const URLSelector = `.HmofF > .OEwtze`;
    const elementURL = await page.$(URLSelector);
    const url = await page.evaluate(elementURL => elementURL.textContent, elementURL);
    
    await navigations.toTheDetails(url, datas, city, state, fullStateName);

    const closeButton = await page.$('.NJfJb > .lZC9wd');
    closeButton && await closeButton.click();
  }
}

module.exports = {
  get:get,
}