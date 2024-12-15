import { z } from "zod";

const vehicleSchema = z.object({
  color: z.string().min(1, "Vehicle color is required").trim().toLowerCase(),
  numberPlate: z.string().min(1, "Vehicle number plate is required").trim(),
  capacity: z
    .string()
    .min(1, "Vehicle capacity must be at least 1")
    .transform((value) => parseInt(value, 10)),
  vehicleType: z
    .string()
    .transform((value) => value.toLowerCase()) // Convert to lowercase
    .refine((value) => ["car", "bike", "auto"].includes(value), {
      message: "Invalid vehicle type",
    }),
});

const locationSchema = z.object({
  latitude: z
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: z
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
});

const captainValidationSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name should be at least 3 characters long")
    .trim()
    .toLowerCase(),
  email: z
    .string()
    .email("Please provide a valid email address")
    .trim()
    .toLowerCase(),
  password: z.string().min(8, "Password should be at least 8 characters long"),
  socketId: z.string().optional(),
  status: z
    .enum(["active", "inActive"], {
      errorMap: () => ({
        message: "Status must be either 'active' or 'inActive'",
      }),
    })
    .optional(),
  vehicle: vehicleSchema,
  location: locationSchema.optional(),
});

export default captainValidationSchema;
