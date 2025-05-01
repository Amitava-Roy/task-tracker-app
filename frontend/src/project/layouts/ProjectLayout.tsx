import { Button } from "@/components/ui/button";
// import { ModeToggle } from "./mode-toggle";
import { Pencil, List, MoveLeft } from "lucide-react";
import { ViewProjectsProps } from "../components/ViewProjects";
import { useLocation } from "react-router";

type ProjectLayoutProps = ViewProjectsProps & {
  children: React.ReactNode;
};

export default function ProjectLayout({
  view,
  setView,
  children,
}: ProjectLayoutProps) {
  const { pathname } = useLocation();
  const text = pathname.includes("task") ? "Tasks" : "Projects";
  return (
    <>
      <div className="container mx-auto px-4 py-6">
        {text === "Tasks" && (
          <Button
            variant="outline"
            className="mb-4 group transition-colors duration-200"
            onClick={() => window.history.back()}
          >
            <MoveLeft className="transition-transform duration-200 group-hover:text-blue-500 group-hover:-translate-x-1" />
            <span className="ml-2 transition-transform duration-200 group-hover:text-blue-500 group-hover:translate-x-1">
              Back to Projects
            </span>
          </Button>
        )}
        <div className="flex mb-6 border-b">
          <Button
            variant={view === "list" ? "default" : "ghost"}
            className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 data-[active]:border-primary"
            data-active={view === "list"}
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
            View {text}
          </Button>
          <Button
            variant={view === "add" ? "default" : "ghost"}
            className="flex items-center gap-2 rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 data-[active]:border-primary"
            data-active={view === "add"}
            onClick={() => setView("add")}
          >
            <Pencil className="h-4 w-4" />
            Add {text}
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </>
  );
}
