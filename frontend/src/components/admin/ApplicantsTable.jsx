import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortListingStatus = ["Accepted", "Rejected"];
function ApplicantsTable() {
  const { applicants } = useSelector((store) => store.application);
  const statusHandler = async (status, id) => {
    try {
      console.log("inside", status, id);
      axios.defaults.withCredentials = true;

      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      console.log("res in table", res.data);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("error in applicants", error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="my-2">
      <Table>
        <TableCaption>A list of applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Applied Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants.applications.map((application) => (
              <tr key={application?._id}>
                <TableCell>{application?.applicant?.fullName}</TableCell>
                <TableCell>{application?.applicant?.email}</TableCell>
                <TableCell>{application?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {application?.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-500"
                      href={application?.applicant?.profile?.resume}
                    >
                      {" "}
                      {application?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </TableCell>
                <TableCell>{application?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal></MoreHorizontal>
                    </PopoverTrigger>
                    <PopoverContent className="w-34">
                      {" "}
                      {shortListingStatus.map((status, index) => {
                        return (
                          <div
                            onClick={() =>
                              statusHandler(
                                status.toLowerCase(),
                                application?._id
                              )
                            }
                            key={index}
                          >
                            {status}
                          </div>
                        );
                      })}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ApplicantsTable;
