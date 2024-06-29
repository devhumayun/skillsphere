export const formateMyDate = (date) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate)) {
    throw new Error("Invalid date");
  }

  const day = parsedDate.getDate();
  const month = parsedDate.toLocaleString("en-US", { month: "long" });
  const year = parsedDate.getFullYear();

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // For 4th to 20th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const ordinalSuffix = getOrdinalSuffix(day);
  const formattedDate = `${day}${ordinalSuffix} ${month} ${year}`;

  return formattedDate;
};
