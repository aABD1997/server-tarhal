function excludeFromObject(property, obj) {
  const newObj = { ...obj };
  delete newObj[property];
  return newObj;
}

module.exports = {
  excludeFromObject
}