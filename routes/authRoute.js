const express = require("express");
const {
  createUser,
  loginUser,
  getAllUser,
  getAUser,
  deleteAUser,
  updateAUser,
  blockUser,
  unblockUser,
  logoutUser,
  refreshToken,
} = require("../controller/userCtrl");
const { authMiddleware, idAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

//GET REQUESTS
router.get("/all-users", getAllUser);
router.get("/refresh", refreshToken);
router.get("/logout", logoutUser);
router.get("/:id", authMiddleware, idAdmin, getAUser);

//POST REQUESTS
router.post("/register", createUser);
router.post("/login", loginUser);

//PUT REQUESTS
router.put("/edit-user", authMiddleware, updateAUser);
router.put("/block-user/:id", authMiddleware, idAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, idAdmin, unblockUser);

//DELETE REQUESTS
router.delete("/:id", deleteAUser);

module.exports = router;
