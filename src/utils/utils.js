export function useFormatCurrency() {
  const formatCurrencyIDR = (number) => {
    // Mengubah angka menjadi format mata uang Rupiah
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return { formatCurrencyIDR };
}