"use client";

import { useEffect, useState } from "react";

type IssueType = {
  id: number;
  title: string;
  description: string;
};

export default function Home() {
  const [issues, setIssues] = useState<IssueType[]>([]);
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
      setIsLoading(false); // Set isLoading to false regardless of success or error
    }
  };
  return (
    <div>
      DashBoard
    </div>
  );
}
