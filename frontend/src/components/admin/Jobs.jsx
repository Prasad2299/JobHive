import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "../hooks/useGetAllAdminJobs";
import { setSearchJobText } from "@/redux/jobSlice";

function Jobs() {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchJobText(input));
  }, [input]);
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            onChange={(e) => {
              console.log(e.target.value);
              setInput(e.target.value);
            }}
            placeholder="Filter by name, role"
          ></Input>
          <Button
            onClick={() => {
              navigate("/admin/job/create");
            }}
          >
            New Job
          </Button>
        </div>
        <AdminJobsTable></AdminJobsTable>
      </div>
    </div>
  );
}

export default Jobs;
