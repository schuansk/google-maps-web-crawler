const Log = require('../models/Log');

async function save(data) {
  const log = new Log(data);
  await log.save();
  return log;
};

async function update(id, data) {
  await Log.findByIdAndRemove(id);  
  await save(data);
};

module.exports = {
  save: save,
  update: update,
};
