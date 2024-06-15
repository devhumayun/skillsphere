export const formattedMyTimeDuration = (duration) => {
  duration = Number(duration);

  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  let formattedTime = "";
  if (hours > 0) {
    formattedTime += `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")} hours`;
  } else if (minutes > 0) {
    formattedTime += `${minutes}:${seconds
      .toString()
      .padStart(2, "0")} minutes`;
  } else {
    formattedTime += `${seconds} seconds`;
  }

  return formattedTime;
};
