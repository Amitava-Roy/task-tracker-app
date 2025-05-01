import { Button } from "@/components/ui/button";
import { Loader2, Pencil } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useNavigate } from "react-router";
import { useEffect } from "react";
import { getAuthData } from "@/utils/auth";
import { getAllProjects } from "../api/projectApi";
import { useState } from "react";
import { formatDate } from "@/utils/dateTime";

export type ViewProjectsProps = {
  view: "list" | "add";
  setView: (view: "list" | "add") => void;
};

export type Project = {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export default function ViewProjects({ setView }: ViewProjectsProps) {
  const [projects, setProjects] = useState<Project[] | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { token } = getAuthData();
    if (!token) {
      return;
    }
    const data = await getAllProjects(token);
    setProjects(data?.result);
    setIsLoading(false);
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
        <h2 className="text-2xl font-bold">Your Project</h2>
        <Button
          className="flex items-center gap-2"
          onClick={() => setView("add")}
        >
          <Pencil className="h-4 w-4" />
          Add New Project
        </Button>
      </div>

      {projects?.length === 0 ? (
        <Card className="text-center p-6">
          <CardContent className="pt-6">
            <p className="text-muted-foreground">
              You don't have any Project yet. Create your first project!
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => setView("add")}>Create Project</Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((note) => (
            <Card key={note?._id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl capitalize">
                  {note?.name}
                </CardTitle>
                <CardDescription>
                  Created on : {formatDate(note?.createdAt)}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-muted-foreground">{note?.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/task/${note?._id}`)}
                >
                  View Tasks
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
