import React, { useState } from "react";
import { useApplicationTracker } from "./ApplicationTrackerContext";

export const ApplicationStatusTracker = () => {
  const { applications } = useApplicationTracker();
  const [filter, setFilter] = useState("All");

  const getByType = (type) => applications.filter((app) => app.type === type);

  const getStats = (type) => {
    const list = getByType(type);
    return {
      submitted: list.filter((a) => a.status === "Submitted").length,
      accepted: list.filter((a) => a.status === "Accepted").length,
      rejected: list.filter((a) => a.status === "Rejected").length,
    };
  };

  return {
    applications,
    addApplication,
    updateApplicationStatus,
    getByType,
    getStats,
  };
};

const Stat = ({ title, value }) => (
  <div style={{ border: "1px solid #ccc", padding: 20, borderRadius: 10 }}>
    <p>{title}</p>
    <h2>{value}</h2>
  </div>
);