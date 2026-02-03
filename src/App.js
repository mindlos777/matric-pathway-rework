import "./styles.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/auth";

import { Navbar } from "./navbar";
import { Home } from "./Home_Page";
import { APSCalculator } from "./APSCalculator";
import { AccountPage } from "./AccountPage";
import { Dashboard } from "./Dashboard";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { Applications } from "./Applications";
import { CoursesPage } from "./Courses";
import { Bursaries } from "./Bursaries";
import { ProfilePage } from "./Profile";

function App() {
  return (
    <AuthProvider>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/aps" element={<APSCalculator />} />
        <Route path="/about" element={<div></div>} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/courses" element={<CoursesPage />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bursaries"
          element={
            <ProtectedRoute>
              <Bursaries />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
