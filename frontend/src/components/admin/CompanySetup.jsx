import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../hooks/useGetCompanyById";

function CompanySetup() {
  const params = useParams();
  useGetCompanyById(params.id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { singleCompany } = useSelector((store) => store.company);

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(input);
      const companyid = params.id;
      console.log("Companyid", companyid);
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("website", input.website);
      formData.append("location", input.location);

      if (input.file) {
        formData.append("file", input.file);
      }

      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${companyid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.company) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log("error in company setup", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null,
    });
  }, [singleCompany]);
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/company/create")}
              variant="outline"
            >
              <div className="flex items-center gap-2 text-gray-600 font-semibold">
                <ArrowLeft></ArrowLeft>
                Back
              </div>
            </Button>
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              ></Input>
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              ></Input>
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              ></Input>
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              ></Input>
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              ></Input>
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
            </Button>
          ) : (
            <Button type="submit" className="w-full mt-5">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}

export default CompanySetup;
