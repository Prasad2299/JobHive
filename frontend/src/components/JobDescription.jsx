import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

function JobDescription() {
  // const isApplied = true;

  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  // console.log("singlejob", singleJob);
  // console.log("user", user);

  const dispatch = useDispatch();
  const isInitiallyApplied =
    singleJob?.applications.some((app) => app.applicant === user?._id) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply-job/${jobId}`,
        {
          withCredentials: true,
        }
      );
      console.log("res in applicaiton=>", res);
      if (res.data.success) {
        setIsApplied(true); //update local state
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob)); // help us to real time ui update
        console.log("updatesingle job in jd=>", updateSingleJob);
        toast(res.data.message);
      }
    } catch (error) {
      console.log("error in apply now", error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/job-by-id/${jobId}`, {
          withCredentials: true,
        });
        console.log("res in jd=>", res);
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some((app) => app.applicant === user?._id) //ensure sync with fetched data
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);
  return (
    <div>
      {/* <Navbar></Navbar> */}
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
          {" "}
          <div>
            <h1 className="font-bold text-lg">{singleJob?.title}</h1>
            <div className="flex gap-2 mt-4">
              <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
                {singleJob?.position} Position
              </Badge>
              <Badge className={"text-[#F83002]"} variant={"ghost"}>
                {singleJob?.jobType}
              </Badge>
              <Badge className={"text-[#7209b7] font-bold"} variant={"ghost"}>
                {singleJob?.salary}LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#54197c]"
            }`}
          >
            {isApplied ? "Already Applied" : "Applied Now"}
          </Button>
        </div>
        <h1 className="border-b-2 borrder-gray-300 font-medium py-4">
          {singleJob?.description}
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1">
            Role:
            <span className="pl-4 font-medium text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:
            <span className="pl-4 font-medium text-gray-800">
              {singleJob?.location}
            </span>
          </h1>{" "}
          <h1 className="font-bold my-1">
            Description:
            <span className="pl-4 font-medium text-gray-800">
              {singleJob?.description}
            </span>
          </h1>{" "}
          <h1 className="font-bold my-1">
            Experience:
            <span className="pl-4 font-medium text-gray-800">
              {singleJob?.experienceLevel} yrs
            </span>
          </h1>{" "}
          <h1 className="font-bold my-1">
            Salary:
            <span className="pl-4 font-medium text-gray-800">
              {singleJob?.salary}LPA
            </span>
          </h1>{" "}
          <h1 className="font-bold my-1">
            Total Applicant:
            <span className="pl-4 font-medium text-gray-800">
              {singleJob?.applications.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:
            <span className="pl-4 font-medium text-gray-800">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
