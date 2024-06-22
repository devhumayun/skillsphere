export const formatAmountForStripe = (amount, currency) => {
  let numberFormate = new Intl.NumberFormat("bn-BD", {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });

  const parts = numberFormate.formatToParts(amount);

  let zeroDecimalNumber = true;

  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalNumber = false;
    }
  }
  return zeroDecimalNumber ? amount : Math.round(amount * 100);
};
