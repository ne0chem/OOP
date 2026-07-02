import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "./layouts/AdminLayout";
import { LoginPage } from "./auth/components/LoginPage";
import { ProtectedRoute } from "./auth/components/ProtectedRoute";
import { WebinarsListPage } from "./features/webinars/pages/WebinarsListPage";
import { ExpertsListPage } from "./features/experts/pages/ExpertsListPage";
import { ExpertCreatePage } from "./features/experts/pages/ExpertCreatePage";
import { ExpertEditPage } from "./features/experts/pages/ExpertEditPage";
import { SocialsPage } from "./features/socials/pages/SocialsPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/webinars" replace />} />
        <Route path="webinars" element={<WebinarsListPage />} />
        <Route path="experts" element={<ExpertsListPage />} />
        <Route path="experts/create" element={<ExpertCreatePage />} />
        <Route path="experts/edit/:id" element={<ExpertEditPage />} />
        <Route path="socials" element={<SocialsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
