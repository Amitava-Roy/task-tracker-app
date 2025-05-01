import { useEffect, useState } from "react";
import ViewProjects from "../components/ViewProjects";
import ProjectLayout from "../layouts/ProjectLayout";
import AddProject from "../components/AddProject";
import { getAuthData } from "@/utils/auth";
import { useNavigate } from "react-router";

export default function ProjectPage() {
  const [view, setView] = useState<"list" | "add">("list");
  // const isLoggedIn = false;

  const { token } = getAuthData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // if (!isLoggedIn) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <h1 className="text-2xl font-bold">Please log in to view this page.</h1>
  //     </div>
  //   );
  // }
  return (
    <>
      <ProjectLayout view={view} setView={setView}>
        {view == "list" && <ViewProjects view={view} setView={setView} />}
        {view == "add" && <AddProject view={view} setView={setView} />}
      </ProjectLayout>
    </>
  );
}
