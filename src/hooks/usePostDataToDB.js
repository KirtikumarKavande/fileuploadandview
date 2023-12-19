'use client'

import { BASE_URL } from "@/utility/constant/constant";

const usePostDataToDB = () => {
  return async (url,method, dataObj) => {
    try {
      const res = await fetch(`${BASE_URL}/${url}`, {
        method: method,
        body: JSON.stringify(dataObj),
        headers: { "content-type": "application/json" },
      });

      const data = await res.json();
      return data;
    } catch (err) {
      return {
        success: false,
        statusCode: 400,
        message: "Something Went Wrong",
      };
    }
  };
};

export default usePostDataToDB;
