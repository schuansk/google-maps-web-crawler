async function elements(page, selector) {
  const element = await page.$$eval(selector, names => names.map(name => name.innerText));
  return element.length;
}

module.exports = {
  elements:elements,
}
