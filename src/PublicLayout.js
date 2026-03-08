import React from "react";
import { Navbar } from "./navbar";

export const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh" }}>{children}</div>
    </>
  );
};
