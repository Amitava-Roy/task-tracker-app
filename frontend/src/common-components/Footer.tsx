import {
  CheckSquare,
  Github,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background px-10">
      <div className="container grid gap-8 py-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Link to="/" className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            <span className="text-lg font-bold">TaskMaster</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Simplify your workflow and boost productivity with our intuitive
            task management solution.
          </p>
          <div className="mt-4 flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="https://twitter.com" target="_blank" rel="noreferrer">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="https://github.com" target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="https://linkedin.com" target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="https://instagram.com" target="_blank" rel="noreferrer">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-medium">Product</h3>
          <ul className="grid gap-2">
            <li>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Integrations
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Changelog
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-medium">Resources</h3>
          <ul className="grid gap-2">
            <li>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Documentation
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Tutorials
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Support
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-medium">Subscribe to our newsletter</h3>
          <p className="text-sm text-muted-foreground">
            Get the latest updates and news delivered to your inbox.
          </p>
          <form className="mt-2 flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="max-w-[220px]"
              required
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
      <Separator />
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} TaskMaster. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link to="#" className="hover:text-foreground">
            Terms
          </Link>
          <Link to="#" className="hover:text-foreground">
            Privacy
          </Link>
          <Link to="#" className="hover:text-foreground">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
}
