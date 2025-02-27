import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

function CompanyCreate() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();

  const registerCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        {
          companyName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.company) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        navigate(`/admin/company/${res?.data?.company?._id}`);
      }
    } catch (error) {
      console.log("error in registering company", error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-xl">Your Company Name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? you can change this
            later.
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="Microsoft , Google etc."
          onChange={(e) => setCompanyName(e.target.value)}
        ></Input>
        <div className="flex items-center my-5 gap-4">
          <Button
            onClick={() => {
              navigate("/admin/companies");
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button onClick={registerCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
}

export default CompanyCreate;
