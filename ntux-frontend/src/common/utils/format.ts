export const shortenDateFormat = (timestamp: number) => {
  const now = new Date().getTime() / 1000; //second
  const diff = Math.abs(now - timestamp);

  //print in minutes
  if (diff >= 0 && diff < 60 * 60) {
    const minutes = Math.floor(diff / 60);
    return `${minutes || 1} Minutes`;
  }

  //print in hours
  if (diff >= 60 * 60 && diff < 60 * 60 * 24) {
    const hours = Math.floor(diff / (60 * 60));
    return `${hours || 1} Hours`;
  }

  //print in days
  if (diff >= 60 * 60 * 24 && diff < 60 * 60 * 24 * 30) {
    const days = Math.floor(diff / (60 * 60 * 24));
    return `${days || 1} Days`;
  }

  //print in months
  if (diff >= 60 * 60 * 24 * 30 && diff < 60 * 60 * 24 * 30 * 12) {
    const months = Math.floor(diff / (60 * 60 * 24 * 30));
    return `${months || 1} Months`;
  }

  //print in years
  if (diff >= 60 * 60 * 24 * 30 * 12) {
    const years = Math.floor(diff / (60 * 60 * 24 * 30 * 12));
    return `${years || 1} Years`;
  }

  return '';
};
