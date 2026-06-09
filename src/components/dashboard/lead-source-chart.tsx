import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sources = [
  { label: "Social Media", percent: 45, color: "bg-primary-container" },
  { label: "Referral", percent: 30, color: "bg-secondary-container" },
  { label: "Walk-in", percent: 15, color: "bg-tertiary-container" },
  { label: "Other", percent: 10, color: "bg-outline-variant" },
];

export function LeadSourceChart() {
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="font-title-md">Lead Source</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex h-6 rounded-full overflow-hidden">
          {sources.map((s) => (
            <div key={s.label} className={s.color} style={{ width: s.percent + "%" }} title={s.label} />
          ))}
        </div>
        <div className="space-y-2 mt-3">
          {sources.map((s) => (
            <div key={s.label} className="flex justify-between items-center">
              <div className="flex items-center gap-2 font-body-sm text-body-sm">
                <span className={`w-3 h-3 rounded-full ${s.color}`} />
                {s.label}
              </div>
              <span className="font-label-md text-label-md">{s.percent}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
