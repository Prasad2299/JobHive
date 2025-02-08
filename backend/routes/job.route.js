const express = require("express");
const {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
} = require("../controllers/job.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

router.route("/create").post(isAuthenticated, postJob);
router.route("/all-jobs").get(isAuthenticated, getAllJobs);
router.route("/job-by-id/:id").get(isAuthenticated, getJobById);
router.route("/admin-jobs").get(isAuthenticated, getAdminJobs);

module.exports = router;
