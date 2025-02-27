import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import ApplicantsTable from "./ApplicantsTable";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAllApplicants } from "@/redux/applicationSlice";

function Applicants() {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  console.log("applicants=>", applicants);
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicant`,
          { withCredentials: true }
        );
        console.log("Apply on =>", res.data);
        if (res.data.success) {
          dispatch(setAllApplicants(res.data.job));
        }
      } catch (error) {
        console.log("error in applicants", error);
        toast.error(error.response.data.messsage);
      }
    };
    fetchApplicants();
  }, []);
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-7xl mx-auto my-2">
        <h1 className="font-bold">
          Applicants ({applicants.applications.length})
        </h1>
        <ApplicantsTable></ApplicantsTable>
      </div>
    </div>
  );
}

export default Applicants;
