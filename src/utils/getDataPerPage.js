const checks = require('./checks');
const getData = require('./getData');
const count = require('./count');

async function firstPage(page, brother, term, datas, city, state, fullStateName) {
  const selector = `.rl_tg > div:nth-child(${brother}) > .UNPWid`;
  
  const exists = await checks.checksIfTheTermExistsInTheName(page, selector, term);

  exists && await getData.get(page, selector, datas, city, state, fullStateName);
}

async function othersPages(page, brother, term, datas, city, state, fullStateName) {
  const baseSelector = `.rl_istc > div[jsname="DOzeKf"] > div:nth-child(${brother}) > div > .rl_tg`;
  const sectionSelector = `${baseSelector} > .l6Ea0c`;
  
  const elementsInTheSection = await count.elements(page, sectionSelector);

  for (let i = 1; i <= elementsInTheSection; i++) {
    const selector = `${baseSelector} > div:nth-child(${i}) > .UNPWid`;

    const exists = await checks.checksIfTheTermExistsInTheName(page, selector, term);

    exists && await getData.get(page, selector, datas, city, state, fullStateName);
  }  
}

module.exports = {
  firstPage: firstPage,
  othersPages: othersPages,
}