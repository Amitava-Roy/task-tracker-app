import { useState } from "react";
import ProjectLayout from "../layouts/ProjectLayout";
import ViewTask from "../components/ViewTask";
import AddTask from "../components/AddTask";

export type TaskT = {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  status: string;
};

export default function TasksPage() {
  const [view, setView] = useState<"list" | "add">("list");
  const [taskEdit, setTaskEdit] = useState<TaskT | null>(null);
  return (
    <ProjectLayout view={view} setView={setView}>
      {view == "list" && (
        <ViewTask view={view} setView={setView} setTaskEdit={setTaskEdit} />
      )}
      {view == "add" && (
        <AddTask view={view} setView={setView} taskEdit={taskEdit} />
      )}
    </ProjectLayout>
  );
}
