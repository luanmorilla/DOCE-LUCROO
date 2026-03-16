import { Card } from "@/components/ui/card";

export function DataTable({
  headers,
  rows
}: {
  headers: string[];
  rows: React.ReactNode[][];
}) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="min-w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-pink-50/70">
              {headers.map((header) => (
                <th
                  key={header}
                  className="border-b border-pink-100 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.15em] text-pink-700"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b border-pink-50 last:border-b-0">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-4 align-top text-sm text-neutral-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
