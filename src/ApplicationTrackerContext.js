import React, { createContext, useContext, useState } from "react";

const ApplicationTrackerContext = createContext();

export function ApplicationTrackerProvider({ children }) {
  const [applications, setApplications] = useState([]);

  const startApplication = ({
    id,
    name,
    type, // "Institution" | "Bursary"
  }) => {
    setApplications((prev) => {
      // prevent duplicates
      if (prev.find((a) => a.id === id)) return prev;

      return [
        ...prev,
        {
          id,
          name,
          type,
          status: "Draft",
          createdAt: new Date(),
        },
      ];
    });
  };

  const updateApplicationStatus = (id, status) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  return (
    <ApplicationTrackerContext.Provider
      value={{
        applications,
        startApplication,
        updateApplicationStatus,
      }}
    >
      {children}
    </ApplicationTrackerContext.Provider>
  );
}

export const useApplicationTracker = () =>
  useContext(ApplicationTrackerContext);