"use client";

import { useState, useEffect } from "react";
import Issue from "./Issue";
import Spinner from "./Spinner";

// Define the type for the issue object
type IssueType = {
  id: number;
  title: string;
  description: string;
  status: string;
};

function IssuePage() {
  const [issues, setIssues] = useState<IssueType[]>([]); // Specify the type for issues state
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getIssues();
  }, []);

  const getIssues = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/issues");
      const data = await res.json();
      setIssues(data);
    } catch (error) {
      setError("An unexpected error occurred in API");
    } finally {
      setTimeout(() => {
        setIsLoading(false); // Set isLoading to false regardless of success or error
      }, 500);
    }
  };

  return (
    <div className=" transition-all ease-in duration-150">
      {error && <p>{error}</p>}
      <div className=" w-full p-3">
        <h2 className=" text-3xl flex justify-center items-center p-2 font-semibold gap-3">
          Issues
        </h2>
        {isLoading ? (
          <div className=" flex justify-center items-center p-2">
            {isLoading && <Spinner color={"black"} />}
          </div>
        ) : (
          issues.map((issue) => (
            <Issue key={issue.id} issue={issue} index={issues.indexOf(issue)} />
          ))
        )}
      </div>
    </div>
  );
}

export default IssuePage;
