export const convertCurrency = (amount, fromCurrency, toCurrency, rates) => {
  if (fromCurrency === toCurrency) return amount;

  const fromRate = rates[fromCurrency] || 1;
  const toRate = rates[toCurrency] || 1;

  const amountInUSD = amount / fromRate;
  return parseFloat((amountInUSD * toRate).toFixed(2));
};
