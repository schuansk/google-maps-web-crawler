const count = require('../utils/count');
const getDataPerPage = require('../utils/getDataPerPage');

async function get(page, term, datas, city, state, fullStateName) {
  const firstPage = await count.elements(page, '.DFuDod > .pgq0Yb > .rl_tg > .l6Ea0c');
  const nextPages = await count.elements(page, '.rl_istc > div > .yf');

  for (let i = 1; i <= firstPage; i++) {
    await getDataPerPage.firstPage(page, i, term, datas, city, state, fullStateName);
  }

  for (let i = 1; i <= nextPages; i++) {
    await getDataPerPage.othersPages(page, i, term, datas, city, state, fullStateName);
  }
}

module.exports = {
  get:get,
}