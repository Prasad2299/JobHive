import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import store from "@/redux/store";

function AppliedJobTable() {
  const { allAppliedJobs } = useSelector((store) => store.job);
  console.log("allAppliedJobs", allAppliedJobs);
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right"> Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs <= 0 ? (
            <span>You Haven't Applied Any Job Yet!</span>
          ) : (
            allAppliedJobs.map((appliedJob, index) => (
              <TableRow key={appliedJob?._id}>
                <TableCell>{appliedJob?.createdAt.split("T")[0]}</TableCell>
                <TableCell>{appliedJob?.job?.title}</TableCell>
                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-500"
                        : appliedJob?.status === "pending"
                        ? "bg-gray-500"
                        : "bg-green-500"
                    }`}
                  >
                    {appliedJob?.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default AppliedJobTable;
