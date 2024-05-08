"use client";

import {
  Chart,
  ChartData,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

type IssueType = {
  id: number;
  title: string;
  description: string;
  status: string;
};

export default function Home() {
  const [issues, setIssues] = useState<IssueType[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState<ChartData<"bar"> | null>(null);

  useEffect(() => {
    getIssues();
  }, []);

  const options: ChartOptions<'bar'> = {
    responsive: true,
    layout: {
        padding: {
            left: 20,   // Adjust left padding
            right: 20,  // Adjust right padding
            top: 20,    // Adjust top padding
            bottom: 20, // Adjust bottom padding
        },
    },
    scales: {
        x: {
            display: true,
            title: {
                display: true,
                text: 'Status',
            },
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'Count',
            },
        },
    },
};


  Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const getIssues = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/issues");
      const data = await res.json();
      setIssues(data);

      // Create chart data and options
      const filteredAndMappedData = data
        .filter(
          (issue: IssueType) =>
            issue.status === "OPEN" || issue.status === "CLOSED"
        )
        .map((issue: IssueType) => ({
          status: issue.status,
        }));

      const openCount = filteredAndMappedData.filter(
        (issue: { status: string }) => issue.status === "OPEN"
      ).length;
      const closedCount = filteredAndMappedData.filter(
        (issue: { status: string }) => issue.status === "CLOSED"
      ).length;

      const chartData = {
        labels: ["Open", "Closed"],
        datasets: [
          {
            label: "Issues",
            data: [openCount, closedCount],
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)", // Background color for "Open"
              "rgba(192, 75, 75, 0.6)", // Background color for "Closed"
            ],
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      setChartData(chartData);
    } catch (error) {
      setError("An unexpected error occurred in API");
    } finally {
      setIsLoading(false); // Set isLoading to false regardless of success or error
    }
  };
  return (
    <div>
      <h2>DashBoard</h2>
      {chartData && <Bar data={chartData} options={options} />}
    </div>
  );
}
