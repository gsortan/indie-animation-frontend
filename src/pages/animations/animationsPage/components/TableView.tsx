import type { Animation } from "../../../../types/animation";

export default function TableView({ anims }: { anims: Animation[] }) {
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
          {anims.map((anim) => (
            <tr key={anim.id} className="border-b border-blue-300 h-[49px]">
              <td className="px-3 py-3">
                <div className="truncate">{anim.title}</div>
              </td>
              <td className="px-3 py-3">
                <div>{new Date(anim.releaseDate).getFullYear()}</div>
              </td>
              <td className="px-3 py-3">
                <div className="text-sm text-gray-300">{anim.ratingAvg}</div>
              </td>
              <td className="px-3 py-3">
                <div className="truncate">{anim.format}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
