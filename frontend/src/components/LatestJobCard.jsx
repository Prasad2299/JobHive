import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function LatestJobCard({ job }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/job-description/${job._id}`)}
      className="p-5 rounded-md shadow-xl cursor-pointer bg-white  border border-gray-100"
    >
      <div>
        <h1 className="font-medium text-lg">{job.company.name}</h1>
        <p className="text-sm text-gray-500">{job.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p>{job.description}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
          {job.position} Position
        </Badge>
        <Badge className={"text-[#F83002]"} variant={"ghost"}>
          {job.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant={"ghost"}>
          {job.salary}LPA
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCard;
