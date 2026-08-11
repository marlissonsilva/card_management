export const currencyFormat = (value: number) => {
  const numberValue = (value / 100).toFixed(2);
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(numberValue));
  return formatted;
};
