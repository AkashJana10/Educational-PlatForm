import mongoose from "mongoose";

const coachingSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "superAdmin",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    isOfflineAvailable: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
    },
    coachingAvater: {
      type: String,
    },
    coachingAdmin: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

const Coaching = mongoose.model("Coaching", coachingSchema);
export default Coaching;
