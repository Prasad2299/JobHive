const Company = require("../models/company.model");
const { cloudinary } = require("../utils/cloudinary");
const getDataUri = require("../utils/datauri");

const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Something is missing!",
        success: false,
      });
    }
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You cannot register with same company!",
        success: false,
      });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });
    return res.status(201).json({
      message: "New company has been added successfully!",
      company,
      success: true,
    });
  } catch (error) {
    console.log("error in register company", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    console.log("userId", userId);
    const companies = await Company.find({ userId: userId });
    console.log("be companies==>", companies);
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found!",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log("error in getting companies for loggeg in user!");
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    let company = await Company.findById({ _id: companyId });
    if (!company) {
      return res.status(404).json({
        message: "Company not found!",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log("error in getting company by id", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const logo = cloudResponse.secure_url;
    const updateData = { name, description, website, location, logo };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    console.log(name, description, website, location);

    console.log("company=>", company);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information has been updated!",
      company,
      success: true,
    });
  } catch (error) {
    console.log("error in updating company!", error);
    return res.status(500).json({
      message: "Internal server error!",
      success: false,
    });
  }
};

module.exports = { registerCompany, getCompany, getCompanyById, updateCompany };
