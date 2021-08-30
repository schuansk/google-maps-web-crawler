async function get(page, datas, city, state, fullStateName) {
  const nameSelector = '.qrShPb span';
  const addressSelector = '.JvjgDd span';
  const phoneSelector = '.TdhIi .zgWrF';
  const locationSelector = '.zloOqf .YhemCb';

  const elementName = await page.$(nameSelector);
  const name = await page.evaluate(elementName => elementName.textContent, elementName);

  const elementAddress = await page.$(addressSelector);
  let address = '';
  elementAddress &&  (address = await page.evaluate(elementAddress => elementAddress.textContent, elementAddress));

  const elementPhone = await page.$(phoneSelector);
  let phoneNumber = '';
  elementPhone && (phoneNumber = await page.evaluate(elementPhone => elementPhone.textContent, elementPhone));

  const elementLocation = await page.$(locationSelector);
  let location = '';
  elementLocation && (location = await page.evaluate(elementLocation => elementLocation.textContent, elementLocation));
  
  let data = {
    name, 
    location,
    address, 
    city,
    state,
    phoneNumber,
  };
  
  const expressions = [',', 'em', 'no'];
  let index = -1;

  const checkCityAtTheLocation = location.toLowerCase().indexOf(city.toLowerCase()) > -1;
  const checkCityAtAddress = address.toLowerCase().indexOf(city.toLowerCase()) > -1;
  const checkState = address.indexOf(state) > -1;
  const checkFullNameState = address.toLowerCase().indexOf(fullStateName.toLowerCase()) > -1;

  !checkCityAtTheLocation && (data.city = '');
  checkCityAtAddress && (data.city = city);

  check(location, expressions[0]) > -1 && (index = check(location, expressions[0]));

  index === -1 && check(location, expressions[1]) > -1 && (index = check(location, expressions[1]));

  index === -1 && check(location, expressions[2]) > -1 && state !== 'RN' && (index = check(location, expressions[2]));

  data.state = location.slice(index + 1).trim();

  if(checkFullNameState || checkState) {
    data.state = fullStateName.trim()
  }
  
  datas.push(data);
}

function check(argument, expression) {
  const index = argument.indexOf(expression);

  if(index > -1) {
    return index;
  } else {
    return false;
  }
}

module.exports = {
  get: get,
}