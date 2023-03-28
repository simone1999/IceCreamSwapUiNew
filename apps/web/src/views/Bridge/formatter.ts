export const formatAmount = (amount: string | number) => {
  const number = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3, notation: 'compact' }).format(number)
}
