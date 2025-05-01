import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { deleteTask, getAllTask, updateTask } from "../api/taskApi";
import { useParams } from "react-router";
import { getAuthData } from "@/utils/auth";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/dateTime";
import { TaskT } from "../pages/TasksPage";

export type ViewProjectsProps = {
  view: "list" | "add";
  setView: (view: "list" | "add") => void;
  setTaskEdit?: (task: TaskT | null) => void;
};

type TaskRes = TaskT & {
  _id: string;
  createdAt: string;
  completedAt: string;
};

export default function ViewTask({
  setView,
  setTaskEdit = () => {},
}: ViewProjectsProps) {
  const [tasks, setTasks] = useState<TaskRes[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  // const navigate = useNavigate();
  const { projectId } = useParams();
  const { token } = getAuthData();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    if (!token || !projectId) {
      return;
    }

    const data = await getAllTask(token, projectId);
    setTasks(data?.result);
    setIsLoading(false);
  };

  const handleTaskEdit = (task: Project) => {
    if (!task) return;
    setTaskEdit(task);
    setView("add");
  };

  const handleTaskComplete = async (taskId: string) => {
    if (!taskId) return;
    await updateTask(token as string, { status: "completed" }, taskId);
    fetchProjects();
  };
  const handleDeleteTask = async (taskId: string) => {
    if (!token) return;
    await deleteTask(token, taskId);
    fetchProjects();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Tasks</h2>
        <Button
          className="flex items-center gap-2"
          onClick={() => setView("add")}
        >
          <Pencil className="h-4 w-4" />
          Add New Task
        </Button>
      </div>

      {tasks?.length === 0 ? (
        <Card className="text-center p-6 ">
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              You don't have any notes yet. Create your first note!
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => setView("add")}>Create Note</Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tasks?.map((note) => (
            <Card
              key={note?._id}
              className="overflow-hidden bg-slate-50 relative "
            >
              <div className="absolute top-2 right-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-100 text-blue-600 hover:text-slate-400 h-8 w-8 p-0"
                  onClick={handleTaskEdit.bind(null, note)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{note?.title}</CardTitle>
                <CardDescription>
                  Created at: {formatDate(note?.createdAt)}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2 space-y-5">
                <Badge
                  variant="outline"
                  className="border  text-blue-700 border-gray-600 bg-blue-50"
                >
                  Status: <span className="capitalize">{note?.status}</span>
                </Badge>
                <p className="text-muted-foreground">{note?.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                {note?.status !== "completed" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-green-500 text-white"
                    onClick={() => handleTaskComplete(note._id)}
                  >
                    Mark complete
                  </Button>
                )}
                {note?.status === "completed" && (
                  <p>Completed at: {formatDate(note?.completedAt)}</p>
                )}

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your note.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteTask(note._id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
