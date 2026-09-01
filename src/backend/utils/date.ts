export function getMonthDate(closingDay: number, month: number) {
  const referenceDate = new Date();
  const startDate = new Date(
    referenceDate.getFullYear(),
    month - 1,
    closingDay,
    0,
    0,
    0,
    0,
  );
  const endDate = new Date(
    referenceDate.getFullYear(),
    month,
    closingDay - 1,
    20,
    59,
    59,
    999,
  );

  return { startDate, endDate };
}
