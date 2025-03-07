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
import { Edit2, MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CompaniesTable() {
  const { companies, searchCompanyText } = useSelector(
    (store) => store.company
  );
  const [filterData, setFilterData] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyText.toLowerCase());
      });
    setFilterData(filteredCompany);
  }, [companies, searchCompanyText]);
  console.log("companies", filterData);
  return (
    <div>
      <Table>
        <TableCaption>A list of registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
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
          {filterData.map((company) => {
            return (
              <tr key={company._id}>
                {" "}
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={company.logo}
                      alt="company profile"
                    ></AvatarImage>
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal></MoreHorizontal>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div
                        onClick={() =>
                          navigate(`/admin/company/${company._id}`)
                        }
                        className="flex items-center gap-4"
                      >
                        {" "}
                        <Edit2 className="w-4"></Edit2>
                        <span>Edit</span>
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

export default CompaniesTable;
