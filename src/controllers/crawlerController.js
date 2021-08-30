const crawlerService = require('../services/crawlerService');

function crawler(req, res) {
  const data = req.body;
  const token = req.params.token;

  if (token !== process.env.TOKEN) {
    res.status(500).send({ message: 'Invalid token!' });
    return;
  }

  try {
    crawlerService.start(data);
    res.status(201).send({ message: 'Starting process' });
  } catch (e) {
    res.status(500).send({ message: 'An error occurred on crawler #1' });
  }  
};

module.exports = {
  crawler: crawler,
};