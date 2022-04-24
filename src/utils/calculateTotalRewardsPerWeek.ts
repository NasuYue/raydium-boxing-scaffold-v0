import { formatIntegerUSDCurrency } from './numberFormat'

/**
 * @param apy {Number} APR as decimal (ie. 0.582)
 * @param liquidity {Number} liquidity in dollar
 * @returns {Number} Rewards as formated dollar amount (ie. $3.12M)
 */
const calculateTotalRewardsPerWeek = (apy: number, liquidity: number) => {
  let calculation = ((liquidity * apy) / 365) * 7
  return formatIntegerUSDCurrency(calculation)
}

export default calculateTotalRewardsPerWeek
