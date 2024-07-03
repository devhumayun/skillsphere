export const formattedMyTimeDuration = (duration) => {
  if (!duration) return null;

  var hour = Math.floor(duration / 3600);
  var min = Math.floor((duration % 3600) / 60);
  var sec = Math.floor((duration % 3600) % 60);

  const durationString = `${hour}:${min}:${sec}`;

  return durationString;
};
