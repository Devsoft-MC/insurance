export function formatMoney(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}
