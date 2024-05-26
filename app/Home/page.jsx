"use client";

import Navbar from "@/components/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getData = async () => {
  const res = await fetch("https://api.github.com/users/vercel/repos") ;

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

export default function Page() {
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
    };

    fetchData();
  }, []);

  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response);
      router.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar />

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={logout}
        >
          Logout
        </button>

      <main className="p-4">
        <h1>Hello, world!</h1>
        <p>This is a basic example of a Next.js page using a custom layout.</p>
        <p>The data from the API is:</p>
        <ul>
          {data.map((repo) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
