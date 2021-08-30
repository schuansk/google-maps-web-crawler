async function auto(page) {
  let previousHeight;
  while (true) {
    try {
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
    } catch (e) {
      break;
    }
  }
}

module.exports = {
  auto:auto,
}
