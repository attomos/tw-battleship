function parsePositionQuery(positionQuery) {
  const safePosition = decodeURIComponent(positionQuery)
  const position = safePosition.split(',').map(Number)
  return position
}

function validatePosition(position) {
  if (!Array.isArray(position) || position.length !== 2) {
    return {
      isValid: false,
      message: 'position query is invalid',
    }
  }
  if (position.some(isNaN)) {
    return {
      isValid: false,
      message: 'position query is not a number',
    }
  }
  if (position.some(e => e < 0 || e >= 10)) {
    return {
      isValid: false,
      message: 'position query is out of range',
    }
  }
  return {
    isValid: true,
  }
}

module.exports = {
  parsePositionQuery,
  validatePosition,
}
