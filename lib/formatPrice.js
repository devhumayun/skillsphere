export const formatPrice = (price) => {
  return Intl.NumberFormat(["en-bn"], {
    style: "currency",
    currency: "BDT",
  }).format(price);
};
