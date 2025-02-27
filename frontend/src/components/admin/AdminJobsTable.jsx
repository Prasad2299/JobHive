import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AdminJobsTable() {
  const { allAdminJobs, searchJobText } = useSelector((store) => store.job);
  const [filterData, setFilterData] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJob =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobText.toLowerCase()) ||
          job?.company?.name.toLowerCase().includes(searchJobText.toLowerCase())
        );
      });
    setFilterData(filteredJob);
  }, [allAdminJobs, searchJobText]);
  console.log("allAdminJobs", filterData);
  return (
    <div>
      <Table>
        <TableCaption>A list of posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {filterData.length <= 0 ? (
            <span>Companies not found!</span>
          ) : (
            <>

            </>
          )} */}
          {filterData.map((job) => {
            return (
              <tr key={job._id}>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal></MoreHorizontal>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div
                        onClick={() => navigate(`/admin/job/${job._id}`)}
                        className="flex items-center gap-4 cursor-pointer"
                      >
                        {" "}
                        <Edit2 className="w-4"></Edit2>
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/job/${job?._id}/applicants`)
                        }
                        className="flex gap-2 w-fit mt-2 cursor-pointer"
                      >
                        <Eye className="w-5"></Eye>
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobsTable;
