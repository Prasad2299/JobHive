import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";

function ProfileUpdateDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills.map((skill) => skill),
    file: user?.profile?.resume,
  });
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    const changeValue = { ...input, [e.target.name]: e.target.value };
    console.log("[e.target.name]", [e.target.name], e.target);
    console.log("changeValue", changeValue);
    setInput(changeValue);
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    console.log("update", e);
    e.preventDefault();
    console.log("input==>", input);
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("error in updating profile", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
    console.log(input);
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className="text-center ">Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="fullName"
                  value={input.fullName}
                  onChange={changeEventHandler}
                  className="col-span-3"
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3"
                ></Input>
              </div>{" "}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="col-span-3"
                ></Input>
              </div>{" "}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3"
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="col-span-3"
                ></Input>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  type="file"
                  name="file"
                  onChange={fileChangeHandler}
                  accept="application/pdf"
                  className="col-span-3"
                ></Input>
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-2">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"></Loader2>
                  please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-2">
                  Update
                </Button>
              )}{" "}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// const ProfileUpdateDialog = ({ open, setOpen }) => {
//   const [loading, setLoading] = useState(false);
//   const { user } = useSelector((store) => store.auth);

//   const [input, setInput] = useState({
//     fullName: user?.fullName || "",
//     email: user?.email || "",
//     phoneNumber: user?.phoneNumber || "",
//     bio: user?.profile?.bio || "",
//     skills: user?.profile?.skills?.map((skill) => skill) || "",
//     file: user?.profile?.resume || "",
//   });
//   const dispatch = useDispatch();

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const fileChangeHandler = (e) => {
//     const file = e.target.files?.[0];
//     setInput({ ...input, file });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("fullName", input.fullName);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("bio", input.bio);
//     formData.append("skills", input.skills);
//     if (input.file) {
//       formData.append("file", input.file);
//     }
//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${USER_API_END_POINT}/profile/update`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );
//       if (res.data.success) {
//         dispatch(setAuthUser(res.data.user));
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//     setOpen(false);
//     console.log(input);
//   };

//   return (
//     <div>
//       <Dialog open={open}>
//         <DialogContent
//           className="sm:max-w-[425px]"
//           onInteractOutside={() => setOpen(false)}
//         >
//           <DialogHeader>
//             <DialogTitle>Update Profile</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={submitHandler}>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="name" className="text-right">
//                   Name
//                 </Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   type="text"
//                   value={input.fullName}
//                   onChange={changeEventHandler}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="email" className="text-right">
//                   Email
//                 </Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={input.email}
//                   onChange={changeEventHandler}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="number" className="text-right">
//                   Number
//                 </Label>
//                 <Input
//                   id="number"
//                   name="number"
//                   value={input.phoneNumber}
//                   onChange={changeEventHandler}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="bio" className="text-right">
//                   Bio
//                 </Label>
//                 <Input
//                   id="bio"
//                   name="bio"
//                   value={input.bio}
//                   onChange={changeEventHandler}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="skills" className="text-right">
//                   Skills
//                 </Label>
//                 <Input
//                   id="skills"
//                   name="skills"
//                   value={input.skills}
//                   onChange={changeEventHandler}
//                   className="col-span-3"
//                 />
//               </div>
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="file" className="text-right">
//                   Resume
//                 </Label>
//                 <Input
//                   id="file"
//                   name="file"
//                   type="file"
//                   accept="application/pdf"
//                   onChange={fileChangeHandler}
//                   className="col-span-3"
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               {loading ? (
//                 <Button className="w-full my-4">
//                   {" "}
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
//                 </Button>
//               ) : (
//                 <Button type="submit" className="w-full my-4">
//                   Update
//                 </Button>
//               )}
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };
export default ProfileUpdateDialog;
