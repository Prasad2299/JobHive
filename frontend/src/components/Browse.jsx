import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "./hooks/useGetAllJobs";
import { setSearchQuery } from "@/redux/jobSlice";

const randomJobs = [1, 2, 3, 4, 5, 6];
function Browse() {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  });
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="my-10 font-bold text-xl">
          Search Results ({allJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-5">
          {allJobs.map((job, index) => {
            return <Job key={job._id} job={job}></Job>;
          })}
        </div>
      </div>
    </div>
  );
}

export default Browse;
