const STRINGIFY = 'stringify-';
export default function (key, value) {
  if (value === void 0) {
    const stringValue = sessionStorage.getItem(key);
    if (stringValue && stringValue.indexOf(STRINGIFY) === 0) {
      return JSON.parse(stringValue.split(STRINGIFY)[1]);
    } else {
      return stringValue;
    }
  } else {
    if (typeof value === 'object' || Array.isArray(value)) {
      value = STRINGIFY + JSON.stringify(value);
    }
    sessionStorage.setItem(key, value);
    return value;
  }
}
