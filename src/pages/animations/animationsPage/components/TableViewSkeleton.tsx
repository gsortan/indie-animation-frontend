export function TableViewSkeleton() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[36rem] table-fixed text-left text-white">
        <thead>
          <tr className="border-b border-blue-300">
            <th className="w-[45%] px-3 py-3">Title</th>
            <th className="w-[15%] px-3 py-3">Year</th>
            <th className="w-[20%] px-3 py-3">Ratings</th>
            <th className="w-[20%] px-3 py-3">Type</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 12 }).map((_, i) => (
            <tr key={i} className="border-b border-blue-300 h-[49px]">
              <td className="px-3 py-3">
                <div className="h-4 w-40 rounded bg-zinc-800 animate-pulse" />
              </td>
              <td className="px-3 py-3">
                <div className="h-4 w-10 rounded bg-zinc-800 animate-pulse" />
              </td>
              <td className="px-3 py-3">
                <div className="h-4 w-12 rounded bg-zinc-800 animate-pulse" />
              </td>
              <td className="px-3 py-3">
                <div className="h-4 w-16 rounded bg-zinc-800 animate-pulse" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
