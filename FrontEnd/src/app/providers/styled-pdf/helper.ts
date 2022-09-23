
let percent = function (internalSize: any, element: any) {
  let index = element.indexOf("%");
  if (index > -1) {
    let getRealValue = element.slice(0, index);
    if (getRealValue > 100) getRealValue = 100;
    return ((internalSize - 5) * Number(getRealValue)) / 100;
  }
  return element;
};

function removePercent(heigth: any) {
  console.log(heigth);
  const index = heigth.indexOf("%");
  let getRealPart = heigth.substr(0, index);
  return Number(getRealPart);
}

function calculateTheLengthOfText(text: any, width: any, heigth: any) {
  return text.length / width - 1;
}

export {
  percent,
  removePercent,
  calculateTheLengthOfText
}