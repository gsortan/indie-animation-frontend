export function AnimationsGridSkeleton() {
  return (
    <div className="max-w-7xl grid gap-4 grid-cols-1 xs:grid-cols-1 sm2:grid-cols-2 md2:grid-cols-3 lg2:grid-cols-4 mr-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex items-center flex-col">
          <div className="w-full max-w-[30rem] md2:w-[20rem] lg2:w-[12rem] aspect-[2/3] rounded-xl bg-zinc-800 animate-pulse" />
          <div className="h-4 w-32 mt-3 rounded bg-zinc-800/70 animate-pulse" />
          <div className="h-4 w-24 mt-2 rounded bg-zinc-800/70 animate-pulse" />
        </div>
      ))}
    </div>
  );
}