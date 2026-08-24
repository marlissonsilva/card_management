export function getMonthDate(closingDay: number, month: number) {
  const referenceDate = new Date();
  const startDate = new Date(referenceDate.getFullYear(), month, closingDay - 1);
  const endDate = new Date(referenceDate.getFullYear(), month + 1, closingDay);

  return { startDate, endDate };
}
