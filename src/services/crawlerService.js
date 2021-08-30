const searchService = require('./searchService');
const logGenerator = require('../utils/logGenerator');

async function start(data) {
  let datas = [];

  for(let i_state = 0; i_state < data.estados.length; i_state++) {
    for(let i_city = 0; i_city < data.estados[i_state].cidades.length; i_city++) {
      await searchService.engine(
        datas,
        data.term, 
        data.estados[i_state].cidades[i_city], 
        data.estados[i_state].sigla, 
        data.estados[i_state].nome,
      );
      
      datas = [];
    }
  }  
  logGenerator.saveLog(`[Request completed]`);
}

module.exports = {
  start: start,
};
