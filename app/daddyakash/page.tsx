export const revalidate = 0;  // ⬅️ Disable caching completely

import prisma from "@/lib/prisma";

function formatToIST(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

export default async function Admin() {
  const visitors = await prisma.visitor.findMany({
    orderBy: { ip: "asc" },
  });

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Visitor Analytics (IST)
      </h1>

      <table className="w-full border-collapse border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">IP Address</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Country</th>
            <th className="border p-2">Visits</th>
            <th className="border p-2">Last Visit (IST)</th>
            <th className="border p-2">All Visits (IST)</th>
          </tr>
        </thead>

        <tbody>
          {visitors.map((v) => {
            const visits = v.visitedAt.length;
            const lastVisit =
              visits > 0
                ? formatToIST(new Date(v.visitedAt[visits - 1]))
                : "—";

            return (
              <tr key={v.id} className="border hover:bg-gray-100">
                <td className="border p-2">{v.ip}</td>
                <td className="border p-2">{v.city || "-"}</td>
                <td className="border p-2">{v.country || "-"}</td>

                {/* ✅ Visit Count */}
                <td className="border p-2 text-center font-semibold">
                  {visits}
                </td>

                {/* ✅ Last Visit in IST */}
                <td className="border p-2">{lastVisit}</td>

                {/* ✅ All Visits in IST */}
                <td className="border p-2 max-w-[350px]">
                  <ul className="list-disc pl-5 space-y-1">
                    {v.visitedAt.map((ts, i) => (
                      <li key={i}>
                        {formatToIST(new Date(ts))}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
