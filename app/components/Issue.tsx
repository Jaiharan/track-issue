import { FaCircle } from "react-icons/fa";
import classnames from "classnames";
import { useState } from "react";
import axios from "axios";

type IssueType = {
  id: number;
  title: string;
  description: string;
  status: string;
};

const Issue = ({ issue, index }: { issue: IssueType; index: number }) => {
  const [status, setStatus] = useState(issue.status);

  const updateIssueStatus = async (issueId: number, newStatus: string) => {
    try {
      // Make a PATCH request to update the issue status
      const response = await axios.patch(`/api/issues/${issueId}`, {
        id: issueId,
        status: newStatus,
      });

      return response.data;
    } catch (error) {
      // Handle error
      console.error(error);
      throw error;
    }
  };

  const handleStatusChange = async () => {
    // Toggle the status between "OPEN" and "CLOSED"
    const newStatus = status === "OPEN" ? "CLOSED" : "OPEN";

    // Trigger API request to update the status
    const updatedIssue = await updateIssueStatus(issue.id, newStatus);

    // Update the local status state
    setStatus(updatedIssue.status);
  };

  return (
    <div className="flex items-start m-4 p-4 rounded-md border border-zinc-900 shadow-lg mb-5 bg-zinc-100">
      <div className="flex flex-row items-center">
        <div className="flex-shrink-0 p-2">
          <FaCircle
            className={classnames({
              "text-green-600": status === "OPEN",
              "text-red-600": status === "CLOSED",
              " cursor-pointer": true,
              "hover:scale-110 hover:shadow-2xl duration-200 ": true,
            })}
            onClick={handleStatusChange}
          />
        </div>
        <h2 className="m-4 p-2 flex-shrink-0 text-2xl font-medium">
          {index + 1}
        </h2>
      </div>
      <div className="flex flex-col p-3">
        <h3 className="flex-grow text-2xl font-medium mb-2">{issue.title}</h3>
        <p className="text-md mb-2">{issue.description}</p>
      </div>
    </div>
  );
};

export default Issue;
