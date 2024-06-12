export const formateMyDate = (data) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formatteDate = new Intl.DateTimeFormat("en-US", options).format(data);

  return formatteDate;
};
