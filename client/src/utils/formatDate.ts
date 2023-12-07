export const timeElapsedString = (value: string | Date): string => {
  const now: Date = new Date();
  const inputDate: Date = typeof value === "string" ? new Date(value) : value;
  const timeDifference: number = now.getTime() - inputDate.getTime();
  const seconds: number = Math.floor(timeDifference / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);
  const data: string = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(inputDate);

  if (days > 0) {
    if (days === 1) {
      return "yesterday";
    } else if (days < 29) {
      return `${days} days ago`;
    } else data;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return "now";
  }
  return "Latestly";
};
