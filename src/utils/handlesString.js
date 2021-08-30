function removeAccent(str) {
  withAccent = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ';
  noAccent = 'AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr';
  newString= '';

  for (let i = 0; i < str.length; i++) {
    replacement = false;

    for (let j = 0; j < withAccent.length; j++) {
      if (str.substr(i, 1) === withAccent.substr(j, 1)) {
        newString += noAccent.substr(j, 1);
        replacement = true;
        break;
      }
    }

    if (replacement === false) newString += str.substr(i, 1);
  }
  return newString;
}

module.exports = {
  removeAccent: removeAccent,
}