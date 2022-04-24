const USDFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

export const formatIntegerUSDCurrency = (number: number) => {
  let parsedInt = USDFormatter.format(number)

  return parsedInt
}
