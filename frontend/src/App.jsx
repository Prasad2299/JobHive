import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/shared/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/Jobs";
import PostJobs from "./components/admin/PostJobs";
import Applicants from "./components/admin/Applicants";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/jobs",
    element: <Jobs></Jobs>,
  },
  {
    path: "/browse",
    element: <Browse></Browse>,
  },
  {
    path: "/profile",
    element: <Profile></Profile>,
  },
  {
    path: "/job-description/:id",
    element: <JobDescription></JobDescription>,
  },
  //admin route starts from below
  {
    path: "/admin/companies",
    element: (
      <ProtectedRoute>
        <Companies></Companies>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/company/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate></CompanyCreate>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/company/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup></CompanySetup>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/jobs",
    element: (
      <ProtectedRoute>
        <AdminJobs></AdminJobs>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/job/create",
    element: (
      <ProtectedRoute>
        <PostJobs></PostJobs>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/job/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants></Applicants>
      </ProtectedRoute>
    ),
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
}

export default App;
