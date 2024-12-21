import crypto from "crypto";

function generateOtp() {
  const randomValue = crypto.randomInt(100000, 1000000); // Between 100000 and 999999
    const otp = randomValue.toString();
    return otp;
}
// distance in km and eta in mins
function calculateFare(distance, eta) {
    // for car rate is ₹14/km and ₹1.5/min 
    // for auto rate is ₹9/km and ₹1/min 
    // for bike rate is ₹5/km and ₹0.5/min 
    
    const carFare = Math.round(distance * 14 + eta * 1.5);
    const autoFare = Math.round(distance *9 + eta * 1.0);
    const bikeFare = Math.round(distance * 5 + eta * 0.5);
    const fare = {
        car: carFare,
        auto: autoFare,
        bike: bikeFare
    }
    return fare;
}

export { generateOtp, calculateFare };


