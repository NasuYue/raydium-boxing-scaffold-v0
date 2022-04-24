const formatNumberToMil = (number: number) => {
  let parsedInt = new Intl.NumberFormat('en-US').format(number)
  let format = parsedInt.split(',')
  return format.length > 2 ? `${format[0]}.${format[1].slice(0, 2)}M` : parsedInt
}

export default formatNumberToMil
