"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const verifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setIsVerified(true);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error.response);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);


  return (  
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="w-1/2 bg-white rounded-lg shadow-lg p-4">
            <h1 className="text-2xl font-bold text-center">Verify your email</h1>
            <p className="text-center"> 
            Please check your email and click the link to verify your account. 
            </p>
            {error && <p className="text-red-500 text-center"> Error Occured</p> }
            {verified && <p className="text-green-500 text-center"> Email Verified</p>}

        </div>
    </div>
  );
};

export default verifyEmailPage;
