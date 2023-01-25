import dayjs from "dayjs";

export function generateDatesFromYearBeggining() {
  const firstDay = dayjs().startOf("year");
  const today = new Date();

  const dates: Date[] = [];
  let compareDate = firstDay;
  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }
  return dates;
}
