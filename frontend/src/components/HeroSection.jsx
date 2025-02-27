import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchQueryHandler = () => {
    console.log("query", query);
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className=" mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#f83002] font-medium">
          No. 1 Job Portal Website
        </span>
        <h1 className="text-5xl font-bold">
          Search , Apply & <br /> Get Your{" "}
          <span className="text-[#6a38c2]">Dream Jobs</span>
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
          minus. Distinctio pariatur eveniet odit.
        </p>
        <div className="flex w-[40%] shadow-lg border-2 border-gray-200 rounded-full pl-3  gap-4 mx-auto">
          <input
            className="outline-none border-none w-full"
            type="text"
            placeholder="Find Your Dream Jobs"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={searchQueryHandler}
            className="rounded-r-full bg-[#6a38c2]"
          >
            <Search className="h-5 w-5"></Search>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
