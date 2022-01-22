export function isValidString(string) {
  let isvalid = true;

  if (string === undefined)
    isvalid = false;
  else if (string === null)
    isvalid = false;
  else if (string === '')
    isvalid = false;
  else if (string.trim() === '')
    isvalid = false;

  return isvalid;
}

export function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}