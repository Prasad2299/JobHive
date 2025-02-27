import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);
  console.log("alljobs", allJobs);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>
      {/* {card are display here} */}
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length > 0 ? (
          allJobs
            .slice(0, 6)
            .map((job, index) => (
              <LatestJobCard key={job._id} job={job}></LatestJobCard>
            ))
        ) : (
          <span>No Jobs Available</span>
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
