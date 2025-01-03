export const requestLocationAccess = () => {
  // Check if geolocation is available
  if (!("geolocation" in navigator)) {
    alert("Geolocation is not supported by this browser.");
    return;
  }

  // Request the user's location
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
     
    },
    (error) => {
      if (error.code === error.PERMISSION_DENIED) {
        return ("Location access denied by the user.");
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        return ("Location information is unavailable.");
      } else if (error.code === error.TIMEOUT) {
        return ("The request to get user location timed out.");
      } else {
        return ("An unknown error occurred.");
      }
    }
  );
};
