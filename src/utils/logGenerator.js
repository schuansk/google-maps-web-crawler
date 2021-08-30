const fs = require('fs');

async function saveLog(content) {
  const datetime = new Date();
  const now = datetime.toISOString().slice(0, 10);  
  const path = `src/logs/${now}.txt`;

  try {
    if (fs.existsSync(path)) fs.appendFile(path, `\r\n${content}`, () => {});
    else fs.writeFileSync(path, content, () => {});
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  saveLog:saveLog
};