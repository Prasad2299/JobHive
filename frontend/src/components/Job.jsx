import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function Job({ job }) {
  const navigate = useNavigate();
  // const jobId = "asdfg";

  const dayAgoFunction = (mongoTime) => {
    const currentTime = new Date();
    const createdAt = new Date(mongoTime);
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="border border-gray-100 p-5 shadow-xl rounded-md bg-white ">
      <div className="flex gap-2 items-center justify-between">
        <p className="">
          {dayAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${dayAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full flex" size="icon">
          <Bookmark></Bookmark>
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo}></AvatarImage>
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-600">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="text-lg font-bold my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
          {job?.position} Position
        </Badge>
        <Badge className={"text-[#F83002]"} variant={"ghost"}>
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant={"ghost"}>
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-center mt-4 gap-4">
        <Button
          onClick={() => navigate(`/job-description/${job._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-white" variant="outline">
          Save For Later
        </Button>
      </div>
    </div>
  );
}

export default Job;
