export const dateFormat = (date: Date) => {
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "full",
  }).format(date);
  return formatted;
};
