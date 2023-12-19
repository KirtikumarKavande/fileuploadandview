'use client'
import { BASE_URL } from "@/utility/constant/constant";

const useGetDataFromDB = () => {
  return async (url) => {
    const res = await fetch(`${BASE_URL}/${url}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });

    const data = await res.json();

    return data;
  };
};

export default useGetDataFromDB;
