import { Bell, CheckSquare, Menu, PersonStanding } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router";
import { clearAuthData } from "@/utils/auth";

// const routes = [
//   {
//     name: "Dashboard",
//     path: "/dashboard",
//   },
//   {
//     name: "Tasks",
//     path: "/tasks",
//   },
//   {
//     name: "Projects",
//     path: "/projects",
//   },
//   {
//     name: "Calendar",
//     path: "/calendar",
//   },
// ];

export function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    clearAuthData();
    navigate("/login");
    console.log("User logged out");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-lg font-bold">
                  <CheckSquare className="h-5 w-5" />
                  TaskManager
                </SheetTitle>
                <p className="text-sm text-muted-foreground">
                  Manage your tasks efficiently
                </p>
              </SheetHeader>
              {/* <nav className="grid gap-2 py-6">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === route.path && "bg-accent text-accent-foreground",
                    )}
                  >
                    {route.name}
                  </Link>
                ))}
              </nav> */}
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            <span className="text-lg font-bold">TaskMaster</span>
          </Link>
          {/* <nav className="hidden md:flex md:gap-2">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === route.path ? "bg-accent text-accent-foreground" : "text-foreground/60",
                )}
              >
                {route.name}
              </Link>
            ))}
          </nav> */}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                  />
                  <AvatarFallback>
                    <PersonStanding />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup></DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
