const express = require('express');
const router = express.Router();
const crawlerController = require('../controllers/crawlerController');
const spreadsheetController = require('../controllers/spreadsheetController');

router.get('/', (req, res) => {
  res.status(200).send({
    title: 'Google Maps Crawler',
    version: '1.0.0',
  });
});

router.post('/crawler/:token', crawlerController.crawler);
router.get('/export/complete/:token', spreadsheetController.completeExport);
router.get('/export/update/:token', spreadsheetController.update);
router.post('/remove/:token', spreadsheetController.remove);
router.get('/find/all/:token', spreadsheetController.findAll);
router.post('/destroy/:token', spreadsheetController.destroy);
router.get('/destroy/code/:token', spreadsheetController.generateCode);

module.exports = router;