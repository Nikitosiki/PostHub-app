export const timeElapsedString = (value: string | Date): string => {
  const now: Date = new Date();
  const inputDate: Date = adjustDate(typeof value === "string" ? new Date(value) : value);
  const timeDifference: number = now.getTime() - inputDate.getTime();
  const seconds: number = Math.floor(timeDifference / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  const data: string = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(inputDate);

  if (days > 0) {
    if (days === 1) {
      return "yesterday";
    } else if (days < 29) {
      return `${days} days ago`;
    } else if (years <= 1) {
      return data;
    }
    else return "long ago";
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return "now";
  }
  return "Latestly";
};

export const shortFormatted = (inputDate: string | Date): string => {
  const date: Date = adjustDate(
    typeof inputDate === "string" ? new Date(inputDate) : inputDate);

  const today = new Date();
  const isSameYear = date.getFullYear() === today.getFullYear();
  const formatOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: isSameYear ? undefined : "numeric",
  };

  return new Intl.DateTimeFormat("en-US", formatOptions).format(date);
};

function adjustDate(date: Date): Date {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();

  // Разница в миллисекундах (один месяц = 30 дней * 24 часа * 60 минут * 60 секунд * 1000 миллисекунд)
  const monthInMilliseconds = 30 * 24 * 60 * 60 * 1000;
  
  // Если разница больше месяца
  if (timeDifference > monthInMilliseconds) {
      const sixtyPercentDifference = timeDifference * 0.7;
      const newDate = new Date(date.getTime() + sixtyPercentDifference);
      return newDate;
  }

  // Если разница не больше месяца, возвращаем исходную дату
  return date;
}