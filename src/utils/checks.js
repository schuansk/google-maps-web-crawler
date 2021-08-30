const handlesString = require('./handlesString');

async function checksIfTheTermExistsInTheName(page, initialSelector, term) {
  const selector = `${initialSelector} > .X7u29 > .GXUAF > .rllt__details > .kR1eme > span`;
  let result = '';

  const element = await page.$(selector);
  result = await page.evaluate(element => element.textContent, element);
  
  const check = handlesString.removeAccent(result.toLowerCase()).indexOf(handlesString.removeAccent(term.toLowerCase())) > -1;
  
  if (check) {
    return true;
  }

  return false;
}

module.exports = {
  checksIfTheTermExistsInTheName:checksIfTheTermExistsInTheName,
}