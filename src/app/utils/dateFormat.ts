export const dateFormat = (date: Date) => {
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
  }).format(date);
  return formatted;
};
