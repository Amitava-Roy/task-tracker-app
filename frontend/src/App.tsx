import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import MainLayout from "./common-components/MainLayout";
import RegisterPage from "./uam/Register";
import LoginPage from "./uam/Login";
import ProjectPage from "./project/pages/ProjectPage";
import TasksPage from "./project/pages/TasksPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ProjectPage />} />
            <Route path="/task/:projectId" element={<TasksPage />} />
          </Route>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
