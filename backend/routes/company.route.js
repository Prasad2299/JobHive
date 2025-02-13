const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
} = require("../controllers/company.controller");
const singleUpload = require("../middlewares/multer");

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);
router.route("/get-company").get(isAuthenticated, getCompany);
router.route("/:id").get(getCompanyById);
router.route("/update/:id").put(isAuthenticated, singleUpload, updateCompany);

module.exports = router;
