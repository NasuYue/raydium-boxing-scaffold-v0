/**
 * Formula source: http://www.linked8.com/blog/158-apy-to-apr-and-apr-to-apy-calculation-methodologies
 *
 * @param interest {Number} APR as percentage (ie. 5.82)
 * @param periods {Number} Compounding frequency (times a year)
 * @returns {Number} APY as percentage (ie. 6 for APR of 5.82%)
 */
const aprToApy = (apr: number, periods: number) => ((1 + apr / 100 / periods) ** periods - 1) * 100

export default aprToApy
