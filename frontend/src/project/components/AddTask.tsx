import type React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { ViewProjectsProps } from "./ViewProjects";
import { createTask, updateTask } from "../api/taskApi";
import { getAuthData } from "@/utils/auth";
import { useParams } from "react-router";
import { TaskT } from "../pages/TasksPage";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router";

type AddTaskProps = ViewProjectsProps & {
  taskEdit: TaskT | null;
};

export default function AddTask({ setView, taskEdit }: AddTaskProps) {
  const [title, setTitle] = useState(taskEdit?.title || "");
  const [content, setContent] = useState(taskEdit?.description || "");
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState(taskEdit?.status || "pending");
  const { projectId } = useParams();
  const { token } = getAuthData();
  // const navigate = useNavigate();
  // const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    try {
      setIsSaving(true);
      if (!token) return;
      if (!taskEdit) {
        await createTask(token, {
          title: title.trim(),
          description: content.trim(),
          projectId: projectId as string,
          status: status,
        });
      } else {
        // update task
        await updateTask(
          token,
          {
            title: title.trim(),
            description: content.trim(),
            projectId: projectId as string,
            status: status,
          },
          taskEdit._id
        );
      }
      setView("list");
    } catch {
      console.log("Error creating task");
      toast.error("Error creating task");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Note</CardTitle>
        <CardDescription>
          Create a new note with a title and content
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSaving}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <Textarea
              id="content"
              placeholder="Write your note here..."
              rows={8}
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)
              }
              disabled={isSaving}
            />
          </div>
          {!taskEdit && (
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <select
                id="status"
                className="w-full border rounded px-3 py-2 text-sm"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={isSaving}
              >
                <option value="pending">Pending</option>
                <option value="in progress">In Progress</option>
              </select>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setView("list")}
            disabled={isSaving}
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Note
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
