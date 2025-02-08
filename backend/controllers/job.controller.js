const Job = require("../models/job.model");

//for admin
const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      company,
    } = req.body;

    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !company
    ) {
      return res.status(400).json({
        message: "Something is missing!",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company,
      created_by: userId,
    });
    return res.status(201).json({
      message: "Job has been created successfully!",
      job,
      success: true,
    });
  } catch (error) {
    console.log("error while posting/creating job", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

//for user
const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .populate({ path: "created_by" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found!",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log("error while getting all companies!");
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

//for user
const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById({ _id: jobId }).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "Job not found!",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log("error while getting job by jobid", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

// for admin - all jobs created by admin

const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
    });
    if (!jobs) {
      return res.status(404).json({
        message: "No Jobs found!",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log("error in getting admin created jobs", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};
module.exports = { postJob, getAllJobs, getJobById, getAdminJobs };
