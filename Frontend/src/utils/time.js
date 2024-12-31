function getCurrentTime24Hour() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0"); // Get hours in 24-hour format
  const minutes = String(now.getMinutes()).padStart(2, "0"); // Get minutes
  const seconds = String(now.getSeconds()).padStart(2, "0"); // Get seconds
  return `${hours}:${minutes}`;
}

export { getCurrentTime24Hour };
