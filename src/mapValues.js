export default { toNumber, toFloat }
export { toNumber, toFloat }

function toFloat (number) {
  return mapValues(number, 0, 127, 0, 1)
}

function toNumber (number) {
  return Math.round(mapValues(number, 0, 1, 0, 127))
}


function mapValues (num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}