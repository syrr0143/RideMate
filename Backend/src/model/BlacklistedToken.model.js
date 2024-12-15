import mongoose from "mongoose";

const blockedTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
    },
    expiresAt: {
      type: Date,
      required: [true, "Expiration date is required"],
      index: { expires: "24h" },
    },
  },
  { timestamps: true }
);

const BlockedToken = mongoose.model("BlockedToken", blockedTokenSchema);
export default BlockedToken;
