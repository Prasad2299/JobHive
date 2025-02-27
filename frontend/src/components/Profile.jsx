import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import ProfileUpdateDialog from "./ProfileUpdateDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "./hooks/useGetAppliedJobs";

// const skills = ["Html", "Css", "Javascript", "Nodejs", "Reactjs"];
const isResume = true;

function Profile() {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-4xl mx-auto bg-white border-2 border-gray-200 rounded-2xl my-5 p-8">
        {" "}
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              ></AvatarImage>
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullName}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline">
            <Pen></Pen>
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-4 my-2">
            <Mail></Mail>
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-4 my-2">
            {" "}
            <Contact></Contact>
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          <div className="flex gap-2 items-center">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge variant="" key={index}>
                  {item}
                </Badge>
              ))
            ) : (
              <h1>NA</h1>
            )}
          </div>
        </div>
        <div className="grid w-full my-2 max-w-sm gap-1 items-center ">
          <Label className="font-bold text-md">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-blue-500 hover:underline"
            >
              {user.profile.resumeOriginalName}
            </a>
          ) : (
            <h1>NA</h1>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        {/* applied job table */}
        <AppliedJobTable></AppliedJobTable>
      </div>
      <ProfileUpdateDialog open={open} setOpen={setOpen}></ProfileUpdateDialog>
    </div>
  );
}

export default Profile;
