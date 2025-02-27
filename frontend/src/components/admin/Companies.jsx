import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetCompanies from "../hooks/useGetCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyText } from "@/redux/companySlice";

function Companies() {
  console.log("============", useGetCompanies());
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setSearchCompanyText(input));
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
            placeholder="Filter by name"
          ></Input>
          <Button
            onClick={() => {
              navigate("/admin/company/create");
            }}
          >
            New Company
          </Button>
        </div>
        <CompaniesTable></CompaniesTable>
      </div>
    </div>
  );
}

export default Companies;
