const Result = require('../models/Result');

async function save(data) {
  const result = new Result(data);
  await result.save();
};

async function find() {
  const results = await Result.find({}, '_id name location address city state phoneNumber createdAt').sort({createdAt: -1});
  return results;
};

async function findByAddress(address) {
  const result = await Result.findOne({address: address});
  return result;
};

async function findByPhoneNumber(phoneNumber) {
  const result = await Result.findOne({phoneNumber: phoneNumber});
  return result;
};

async function remove(id) {
  await Result.findByIdAndRemove(id);
};

async function destroy() {
  await Result.deleteMany();
};

module.exports = {
  save: save,
  find: find,
  findByAddress:findByAddress,
  findByPhoneNumber:findByPhoneNumber,
  remove: remove,
  destroy: destroy,
};
