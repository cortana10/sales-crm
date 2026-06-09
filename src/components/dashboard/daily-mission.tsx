"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DailyMission {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  type: string;
}

const defaultMissions: DailyMission[] = [
  { id: "1", title: "Hubungi 5 Hot Leads", description: "Prioritas leads dengan status Interested", completed: false, type: "call" },
  { id: "2", title: "Follow Up 10 Leads", description: "Leads yang belum dihubungi > 2 hari", completed: false, type: "follow_up" },
  { id: "3", title: "Broadcast 20 Alumni", description: "Gunakan template AI untuk campaign", completed: false, type: "broadcast" },
  { id: "4", title: "Kirim Testimoni ke 5 Leads", description: "Testimoni keluarga untuk paket Umrah", completed: false, type: "testimonial" },
];

export function DailyMission() {
  const [missions, setMissions] = useState<DailyMission[]>(defaultMissions);
  const toggleMission = (id: string) => {
    setMissions(prev => prev.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  };
  const completedCount = missions.filter(m => m.completed).length;

  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="font-title-md">Daily Mission</CardTitle>
          <span className="text-label-sm text-on-surface-variant">{completedCount}/{missions.length}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <ul className="space-y-1">
          {missions.map((mission) => (
            <li key={mission.id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer" onClick={() => toggleMission(mission.id)}>
              <input type="checkbox" checked={mission.completed} onChange={() => toggleMission(mission.id)} className="mt-0.5 accent-primary-container" />
              <div className="flex-1 min-w-0">
                <p className={cn("text-label-md text-on-surface", mission.completed && "line-through text-on-surface-variant/60")}>{mission.title}</p>
                {mission.description && <p className="text-body-sm text-on-surface-variant mt-0.5">{mission.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
