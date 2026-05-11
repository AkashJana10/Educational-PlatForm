import mongoose from "mongoose";

const superAdminSchema = new mongoose.Schema(
  {
    name: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    tradeLicense: {
      type: String,
      required: true,
    },
    tradeCopy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const SuperAdmin = mongoose.model("superAdmin", superAdminSchema);
export default SuperAdmin;
