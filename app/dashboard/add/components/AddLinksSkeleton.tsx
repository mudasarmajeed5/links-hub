import { Skeleton } from "@/components/ui/skeleton";

export default function AddLinksSkeleton() {
  return (
    <div className="p-2 flex flex-col gap-6 items-center justify-center rounded-lg max-w-3xl mx-auto">
      <Skeleton className="h-6 w-32 mt-5" />

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full m-3 rounded-md" />
        ))}
      </div>

      <div className="ml-6 flex gap-2 items-center w-full">
        <Skeleton className="h-10 flex-1 mt-6 rounded-md" /> 
        <Skeleton className="h-10 flex-1 mt-6 rounded-md" />
        <Skeleton className="h-10 flex-1 mt-6 rounded-md" />
      </div>
    </div>
  );
}
