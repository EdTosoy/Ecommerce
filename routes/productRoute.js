const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controller/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

//GET REQUESTS
router.get("/", getAllProducts);
router.get("/:id", getAProduct);

//POST REQUESTS
router.post("/create-product", authMiddleware, isAdmin, createProduct);

//PUT REQUESTS
router.put("/:id", authMiddleware, isAdmin, updateProduct);

//DELETE REQUESTS
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
