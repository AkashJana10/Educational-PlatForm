import TryCatch from "../middlewares/TryCatch.js";
import Coaching from "../models/CoachingCreate.js";

// CREATE COACHING
export const createCoaching = TryCatch(async (req, res) => {
  const { name, isOfflineAvailable, location, coachingAvater } = req.body;
  console.log(req.body);

  if (!name || !location || !coachingAvater) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  const user = req.user;
  // CHECK SUPER ADMIN
  if (user.role !== "superAdmin") {
    return res.status(403).json({
      success: false,
      message: "Only super admin can create coaching",
    });
  }

  const coaching = await Coaching.create({
    owner: user._id,
    name,
    isOfflineAvailable,
    location,
    coachingAvater,
  });
  return res.status(201).json({
    success: true,
    message: "Coaching created successfully",
    coaching,
  });
});

// UPDATE COACHING
export const updateCoaching = TryCatch(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  if (user.role !== "superAdmin") {
    return res.status(403).json({
      success: false,
      message: "Only super admin can update coaching",
    });
  }

  const coaching = await Coaching.findById(id);

  if (!coaching) {
    return res.status(404).json({
      success: false,
      message: "Coaching not found",
    });
  }
  const updatedCoaching = await Coaching.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    message: "Coaching updated successfully",
    coaching: updatedCoaching,
  });
});

export const deleteCoaching = TryCatch(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  if (user.role !== "superAdmin") {
    return res.status(403).json({
      success: false,
      message: "Only super admin can delete coaching",
    });
  }
  const coaching = await Coaching.findByIdAndDelete(id);
  if (!coaching) {
    return res.status(404).json({
      success: false,
      message: "Coaching not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Coaching deleted successfully",
  });
});

export const addAdmin = TryCatch(async (req, res) => {
  const { coachingId } = req.params;
  const { adminId } = req.body;
  const user = req.user;
  if (user.role !== "superAdmin") {
    return res.status(403).json({
      success: false,
      message: "Only super admin can add admin",
    });
  }
  const coaching = await Coaching.findById(coachingId);
  if (!coaching) {
    return res.status(404).json({
      success: false,
      message: "Coaching not found",
    });
  }
  if (coaching.coachingAdmin.includes(adminId)) {
    return res.status(400).json({
      success: false,
      message: "Admin already added",
    });
  }
  coaching.coachingAdmin.push(adminId);
  await coaching.save();
  return res.status(200).json({
    success: true,
    message: "Admin added successfully",
    coaching,
  });
});

export const removeAdmin = TryCatch(async (req, res) => {
  const { coachingId } = req.params;
  const { adminId } = req.body;
  const user = req.user;
  if (user.role !== "superAdmin") {
    return res.status(403).json({
      success: false,
      message: "Only super admin can remove admin",
    });
  }
  const coaching = await Coaching.findById(coachingId);
  if (!coaching) {
    return res.status(404).json({
      success: false,
      message: "Coaching not found",
    });
  }
  coaching.coachingAdmin = coaching.coachingAdmin.filter(
    (admin) => admin.toString() !== adminId,
  );
  await coaching.save();
  return res.status(200).json({
    success: true,
    message: "Admin removed successfully",
    coaching,
  });
});
