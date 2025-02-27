const Job = require("../models/job.model");
const Application = require("../models/application.model");

const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job is required!",
        success: false,
      });
    }
    //check if the job exists or not
    const job = await Job.findById({ _id: jobId });
    if (!job) {
      return res.status(404).json({
        message: "Job not found!",
        success: false,
      });
    }
    //checking existing application if user already apply for this job
    const existingApplication = await Application.find({
      job: jobId,
      applicant: userId,
    });
    console.log("existingApplication==", existingApplication);
    if (existingApplication.length > 0) {
      return res.status(400).json({
        message: "You have already apply for this job!",
        success: false,
      });
    }
    //create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job applied successfully!",
      success: true,
    });
  } catch (error) {
    console.log("error while applying for job", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

const appliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!applications) {
      return res.status(404).json({
        message: "No Application!",
        success: false,
      });
    }
    return res.status(200).json({
      applications,
      success: true,
    });
  } catch (error) {
    console.log("error while fetching applied jobs", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

//admin can check how many users apply for job
const getApplicant = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById({ _id: jobId }).populate({
      path: "applications",
      option: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
        option: { sort: { createdAt: -1 } },
      },
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
    console.log("error while fetching applicant ", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(400).json({
        message: "Status is required!",
        success: false,
      });
    }
    //find application by application id
    const application = await Application.findById({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "Application not found!",
        success: false,
      });
    }
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "status updated successfully!",
      success: true,
    });
  } catch (error) {
    console.log("error while updating status", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};
module.exports = { applyJob, appliedJobs, getApplicant, updateStatus };
