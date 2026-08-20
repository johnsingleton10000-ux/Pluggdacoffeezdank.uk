export function formatGbp(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}

export function emptyCosmeticOptions() {
  return {
    hair: null,
    skin: null,
    clothing: null,
    accessories: null,
    colours: null,
    details: null,
  };
}
