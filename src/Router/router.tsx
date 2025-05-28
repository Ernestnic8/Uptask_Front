import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@layouts/AppLayout";
import DashboardPage from "@pages/DashboardPage";
import CreateProjectPage from "@pages/projects/CreateProjectPage";
import EditProjectPage from "@pages/projects/EditProjectPage";
import ProjectDetailsPages from "@pages/projects/ProjectDetailsPages";
import AuthLayout from "@layouts/AuthLayout";
import LoginPage from "@pages/auth/LoginPage";
import RegisterPage from "@pages/auth/RegisterPage";
import ConfirmAccountPage from '@pages/auth/ConfirmAccountPage';
import RequestNewCode from "@pages/auth/RequestNewCode";
import NewPasswordPage from "@pages/auth/NewPasswordPage";
import ForgotPasswordPage from "@pages/auth/ForgotPasswordPage";
import ProjectTeamPage from "@pages/projects/ProjectTeamPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} index />
          <Route path="/proyectos/nuevo" element={<CreateProjectPage />} />
          <Route
            path="/proyectos/:projectId"
            element={<ProjectDetailsPages />}
          />
          <Route
            path="/proyectos/:projectId/editar"
            element={<EditProjectPage />}
          />
          <Route
            path="/proyectos/:projectId/team"
            element={<ProjectTeamPage />}
          />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/confirm" element={<ConfirmAccountPage />} />
          <Route path="/auth/request" element={<RequestNewCode />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/auth/new-password" element={<NewPasswordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
