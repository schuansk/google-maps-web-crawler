const exportCompleteDataService = require('../services/exportCompleteDataService');
const updateSpreadsheetService = require('../services/updateSpreadsheetService');
const codeService = require('../services/codeService');
const resultsRepository = require('../repositories/resultsRepository');

async function completeExport(req, res) {
  const token = req.params.token;

  if(token !== process.env.TOKEN) {
    res.status(500).send({ message: 'Invalid token!' });
    return;
  }

  try {
    await exportCompleteDataService.exportCompleteData();
    res.status(201).send({ message: 'Export process started' });
  } catch (e) {
    res.status(500).send({ message: 'An error occurred while performing the export' });
  }
};

async function update(req, res) {
  const token = req.params.token;

  if(token !== process.env.TOKEN) {
    res.status(500).send({ message: 'Invalid token!' });
    return;
  }

  try {
    await updateSpreadsheetService.updateSpreadsheet();
    res.status(201).send({ message: 'Spreadsheet update started' });
  } catch (e) {
    res.status(500).send({ message: 'An error occurred while trying to update the spreadsheet' });
  }
};

async function remove(req, res) {
  const token = req.params.token;

  if(token !== process.env.TOKEN) {
    res.status(500).send({ message: 'Invalid token!' });
    return;
  }

  try {
    await resultsRepository.remove(req.body.id);
    res.status(201).send({ message: 'Result removed' });
  } catch (e) {
    res.status(500).send({ message: 'There was an error removing the result' });
  }
};

async function destroy(req, res) {
  const token = req.params.token;

  if(token !== process.env.TOKEN) {
    res.status(500).send({ message: 'Invalid token!' });
    return;
  }

  const code = req.body.code;

  if(codeService.checkCode(code)) {
    try {
      await resultsRepository.destroy();
      res.status(201).send({ message: 'All data has been removed' });
    } catch (e) {
      res.status(500).send({ message: 'There was an error removing all data' });
    }
  } else {
    res.status(500).send({ unauthorized: 'Code expired' });
  }  
};

async function findAll(req, res) {
  const token = req.params.token;

  if(token !== process.env.TOKEN) {
    res.status(500).send({ message: 'Invalid token!' });
    return;
  }

  try {
    const results = await resultsRepository.find();
    res.status(201).send(results);
  } catch (e) {
    res.status(500).send({ message: 'An error occurred while listing the results' });
  }
};

function generateCode(req, res) {
  const token = req.params.token;

  if(token !== process.env.TOKEN) {
    res.status(500).send({ message: 'Invalid token!' });
    return;
  }

  try {
    const code = codeService.codeGenerator();
    res.status(201).send(
      {
        'code': code,
        'warning': 'This code expires in 30 minutes',
      }
    );
  } catch (e) {
    res.status(500).send({ message: 'An error occurred while listing the results' });
  }
};

module.exports = {
  completeExport:completeExport,
  update:update,
  remove:remove,
  destroy:destroy,
  findAll:findAll,
  generateCode:generateCode,
};