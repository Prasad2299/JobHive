import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function PostJobs() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    experience: "",
    jobType: "",
    position: 0,
  });
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);
  console.log("companies in post job", companies);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("input in postjob", input);
    try {
      setLoading(true);

      const res = await axios.post(`${JOB_API_END_POINT}/create`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log("error while job posting", error);
      toast(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value.toLowerCase()
    );
    setInput({ ...input, company: selectedCompany._id });
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={submitHandler}
          className="border border-gray-200  max-w-4xl p-8 shadow-lg rounded-md"
        >
          {" "}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              ></Input>
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              ></Input>
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              ></Input>
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              ></Input>
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              ></Input>
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              ></Input>
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              ></Input>
            </div>
            <div>
              <Label>No.of Position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              ></Input>
            </div>
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                {" "}
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company._id} value={company?.name}>
                      {company?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="flex items-center justify-center my-5">
            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
              </Button>
            ) : (
              <Button
                variant=""
                type="submit"
                className="w-full rounded-md mt-5"
              >
                Post New Job
              </Button>
            )}
          </div>
          {companies.length === 0 && (
            <span className="text-xs text-red-600 font-bold text-center my-2">
              *please registered company first! before posting job!
            </span>
          )}
        </form>
      </div>
    </div>
  );
}

export default PostJobs;
