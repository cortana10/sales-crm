import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const monthlyData = [
  { month: "Oct", value: 12 },
  { month: "Nov", value: 18 },
  { month: "Dec", value: 15 },
  { month: "Jan", value: 24 },
  { month: "Feb", value: 20 },
  { month: "Mar", value: 28 },
];

const maxValue = Math.max(...monthlyData.map(d => d.value));

export function ClosingTrendChart() {
  return (
    <Card className="flex-1">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="font-title-md">Closing Trend</CardTitle>
          <span className="text-label-sm text-on-surface-variant">Last 6 Months</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-end justify-between gap-2 h-32 pt-2 pb-1 relative">
          {monthlyData.map((d, i) => {
            const isLast = i === monthlyData.length - 1;
            const heightPercent = (d.value / maxValue) * 100;
            return (
              <div
                key={d.month}
                className={`flex-1 rounded-t-sm relative group cursor-pointer ${isLast ? "bg-primary-container" : "bg-surface-container"}`}
                style={{ height: `${heightPercent}%` }}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {d.value}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-label-sm text-on-surface-variant mt-1">
          {monthlyData.map(d => (
            <span key={d.month} className="text-[10px] uppercase">{d.month}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
