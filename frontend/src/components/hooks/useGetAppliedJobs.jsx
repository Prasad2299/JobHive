import { setAllAppliedJobs } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetAppliedJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/get-applied-job`,
          {
            withCredentials: true,
          }
        );
        console.log("res.data.applications==>", res.data.applications);
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, []);
  return;
}

export default useGetAppliedJobs;
