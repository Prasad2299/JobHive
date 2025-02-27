import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetAllJobs() {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((store) => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        console.log("searchQuery", searchQuery);
        const res = await axios.get(
          `${JOB_API_END_POINT}/all-jobs/?keyword=${searchQuery}`,
          {
            withCredentials: true,
          }
        );
        console.log("res.data.jobs==>", res.data.jobs);
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
  return;
}

export default useGetAllJobs;
