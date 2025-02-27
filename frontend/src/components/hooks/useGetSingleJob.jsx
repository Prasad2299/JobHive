import { setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetSingleJob(id) {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/job-by-id/${id}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, []);
  return;
}

export default useGetSingleJob;
