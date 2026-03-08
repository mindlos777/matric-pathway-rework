import "./styles.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/auth";

import { PublicLayout } from "./PublicLayout";
import { DashboardLayout } from "./dashboardLayout";
import { Home } from "./Home_Page";
import { APSCalculator } from "./APSCalculator";
import { AccountPage } from "./AccountPage";
import { Dashboard } from "./Dashboard";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { Applications } from "./Applications";
import { CoursesPage } from "./Courses";
import { Bursaries } from "./Bursaries";
import { ProfilePage } from "./Profile";
import { ApplicationStatusTracker } from "./ApplicationStatusTracker";
import { ApplicationTrackerProvider } from "./ApplicationTrackerContext";

import { AIChatWidget } from "./components/AIChatWidget";

function App() {
  return (
    <AuthProvider>
      <ApplicationTrackerProvider>
        <AppContent />
      </ApplicationTrackerProvider>
    </AuthProvider>
  );
}

/* ---------- THIS COMPONENT CAN SAFELY USE useAuth ---------- */

const AppContent = () => {
  const location = useLocation();
  const { user } = useAuth();

  const hideAI = !user || location.pathname === "/profile";

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <Home />
            </PublicLayout>
          }
        />

        <Route
          path="/aps"
          element={
            <PublicLayout>
              <APSCalculator />
            </PublicLayout>
          }
        />

        <Route
          path="/account"
          element={
            <PublicLayout>
              <AccountPage />
            </PublicLayout>
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <CoursesPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Applications />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/bursaries"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Bursaries />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProfilePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/application-status"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ApplicationStatusTracker />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* GLOBAL AI CHAT WIDGET */}
      {!hideAI && <AIChatWidget />}
    </>
  );
};

export default App;
