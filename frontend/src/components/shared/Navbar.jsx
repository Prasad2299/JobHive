import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setAuthUser } from "@/redux/authSlice";

function Navbar() {
  // const user = false;
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("user==>", user);
  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("error in logout=>", error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-[#25be6a]">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className="text-[#F83002]">Hive</span>
          </h1>
        </div>
        <div className="flex gap-12 items-center">
          <ul className="flex font-medium items-center gap-5">
            {user && user?.role === "recruiter" ? (
              <>
                {" "}
                <li>
                  {" "}
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li>
                  {" "}
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li>
                  {" "}
                  <Link to="/">Home</Link>
                </li>
                <li>
                  {" "}
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  {" "}
                  <Link to="browse">Browse</Link>
                </li>
              </>
            )}

            {/* <li>
            <Link>Home</Link>
          </li>
          <li>
            <Link>Jobs</Link>
          </li>
          <li>
            <Link>Browse</Link>
          </li> */}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                {" "}
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="signup">
                <Button className="bg-[#6A38C2] hover:bg-[#592ea3]">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="profile"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex  gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="profile"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullName}</h4>
                    <p className="text-sm text-muted-foreground">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex gap-2 w-fit items-center cursor-pointer">
                    {user && user?.role === "student" && (
                      <>
                        {" "}
                        <User2></User2>
                        <Link to="/profile">
                          {" "}
                          <Button variant="link">View Profile</Button>
                        </Link>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2 w-fit items-center cursor-pointer">
                    <LogOut></LogOut>
                    <Button onClick={logOutHandler} variant="link">
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

//Link tag get from react router dom
