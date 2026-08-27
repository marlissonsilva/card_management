export const dateFormat = (date: Date) => {
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeZone: "UTC",
  }).format(date);
  return formatted;
};
