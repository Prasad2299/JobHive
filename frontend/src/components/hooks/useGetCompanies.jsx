import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function useGetAllCompanies() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        console.log(
          "COMPANY_API_END_POINT=>",
          `${COMPANY_API_END_POINT}/get-company`
        );
        const res = await axios.get(`${COMPANY_API_END_POINT}/get-company`, {
          withCredentials: true,
        });
        console.log("res.data.companies==>", res.data);
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCompanies();
  }, []);
  return;
}

export default useGetAllCompanies;
