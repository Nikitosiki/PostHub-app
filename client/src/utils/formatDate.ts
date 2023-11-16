export const getShortFormattedDate = (inputDate: string | Date): string => {
  const date: Date =
    typeof inputDate === "string" ? new Date(inputDate) : inputDate;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
};
