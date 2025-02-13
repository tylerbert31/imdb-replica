import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-zinc-50" />
      <p className="text-zinc-100 mt-4 text-lg">Loading...</p>
    </div>
  );
}
