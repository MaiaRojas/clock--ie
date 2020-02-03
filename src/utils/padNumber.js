function padNumber(value) {
  return value > 9 ? String(value) : "0" + value;
}

export default padNumber;