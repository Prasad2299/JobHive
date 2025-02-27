import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Pune", "Mumbai", "Banglore", "Delhi"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "40k-1L", "1-2L", "2-4L"],
  },
  {
    filterType: "Job Role",
    array: ["Frontend", "Backend", "Fullstack", "Web Designer"],
  },
];
function FilterCard() {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    console.log("selectedValue", selectedValue);
    dispatch(setSearchQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="w-full p-3 rounded-md border-2 bg-white">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div>
            <h1 className="text-xl font-bold">{data.filterType}</h1>
            {data.array.map((item, idx) => (
              <div className="flex space-x-2 items-center my-2">
                <RadioGroupItem
                  value={item}
                  key={`r${index - idx}`}
                ></RadioGroupItem>
                <Label htmlFor={`r${index - idx}`}>{item}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
