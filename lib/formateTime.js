export const formattedMyTimeDuration = (duration) => {
  if (!duration) return null;

  const hour = Math.floor(duration / 3600);
  const min = Math.floor((duration % 3600) / 60);
  const sec = Math.floor((duration % 3600) % 60);

  let durationString = "";

  if (hour > 0) {
    durationString = `${hour}:${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")} hour`;
  } else if (min > 0) {
    durationString = `${min}:${sec.toString().padStart(2, "0")} minute`;
  } else {
    durationString = `${sec} sec`;
  }

  return durationString;
};
