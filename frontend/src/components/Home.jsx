import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import useGetAllJobs from "./hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "./hooks/useGetCompanies";

function Home() {
  useGetAllJobs();
  console.log("useGetAllJobs=>", useGetAllJobs());
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <HeroSection></HeroSection>
      <CategoryCarousel></CategoryCarousel>
      <LatestJobs></LatestJobs>
      <Footer></Footer>
    </>
  );
}

export default Home;
