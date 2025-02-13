import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-zinc-50">
          404 - Not Found
        </h1>
        <p className="text-zinc-100 max-w-[600px] md:text-xl/relaxed">
          Sorry, we couldn't find the page you're looking for. Please check the
          URL or return to home.
        </p>
      </div>
      <Link href="/">
        <Button variant="default" size="lg">
          Return to Home
        </Button>
      </Link>
    </div>
  );
}
