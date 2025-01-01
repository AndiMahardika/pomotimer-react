import { Skeleton } from "@/components/ui/skeleton";

export default function TaskSkeleton() {
  return (
    <Skeleton className="p-2 bg-slate-400 flex justify-between items-center">
      <Skeleton className="h-fit p-2 w-1/3 bg-slate-700" />
      <div className="flex items-center gap-x-2 w-1/3">
        <Skeleton className="h-fit p-2 w-full bg-slate-700" />
        <Skeleton className="p-2 bg-slate-700" />
        <Skeleton className="p-4 bg-slate-700" />
      </div>
    </Skeleton>
  );
}
