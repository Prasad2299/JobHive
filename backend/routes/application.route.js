const express = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  applyJob,
  appliedJobs,
  getApplicant,
  updateStatus,
} = require("../controllers/application.controller");

const router = express.Router();

router.route("/apply-job/:id").get(isAuthenticated, applyJob);
router.route("/get-applied-job").get(isAuthenticated, appliedJobs);
router.route("/:id/applicant").get(isAuthenticated, getApplicant);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

module.exports = router;
