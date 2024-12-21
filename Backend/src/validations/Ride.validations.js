import { z } from "zod";

const rideValidation = z.object({
  pickup: z.string().nonempty().trim(),
  destination: z.string().nonempty().trim(),
  vehicleType: z
    .string()
    .transform((value) => value.toLowerCase()) // Convert to lowercase
    .refine((value) => ["car", "bike", "auto"].includes(value), {
      message: "Invalid vehicle type",
    }),
});

export default rideValidation;
