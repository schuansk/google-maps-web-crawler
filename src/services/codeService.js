let currentCode;

function codeGenerator() {
  const code = (Math.random()*0xFFFFFF<<0).toString(16);
  currentCode = code;
  
  setTimeout(() => {
    currentCode = '';
  }, 1800000);
  
  return currentCode;
}

function checkCode(code) {
  if(code === currentCode) {
    currentCode = '';
    return true;
  } else {
    return false;
  }
};

module.exports = {
  codeGenerator:codeGenerator,
  checkCode:checkCode,
};