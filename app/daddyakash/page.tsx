import prisma from "@/lib/prisma";

export default async function Admin() {
  const visitors = await prisma.visitor.findMany({
    orderBy: { ip: "asc" },
  });

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Visitor Analytics</h1>

      <table className="w-full border-collapse border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">IP Address</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Country</th>
            <th className="border p-2">Visits</th>
            <th className="border p-2">Last Visit</th>
            <th className="border p-2">All Visits</th>
          </tr>
        </thead>

        <tbody>
          {visitors.map((v:any) => {
            const visits = v.visitedAt.length;
            const lastVisit =
              visits > 0 ? new Date(v.visitedAt[visits - 1]).toLocaleString() : "—";

            return (
              <tr key={v.id} className="border hover:bg-gray-100">
                <td className="border p-2">{v.ip}</td>
                <td className="border p-2">{v.city || "-"}</td>
                <td className="border p-2">{v.country || "-"}</td>

                {/* Number of visits */}
                <td className="border p-2 text-center font-semibold">
                  {visits}
                </td>

                {/* Last visit */}
                <td className="border p-2">{lastVisit}</td>

                {/* List all visits */}
                <td className="border p-2 max-w-[350px]">
                  <ul className="list-disc pl-5 space-y-1">
                    {v.visitedAt.map((ts : any , i : number) => (
                      <li key={i}>{new Date(ts).toLocaleString()}</li>
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
