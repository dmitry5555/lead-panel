"use client";

import { useEffect, useState } from "react";
import LeadRow from "@/components/LeadRow";
import LeadRowSkel from "./LeadRowSkel"

type LeadEvent = {
  id: string;
  created_at: string;
  url: string;
  status?: string | null;
  comment?: string | null;
};

const LeadsList = () => {
  const [events, setEvents] = useState<LeadEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
    if (!url || !key) return;

    fetch(
      `${url}/rest/v1/events?select=id,created_at,url,status,comment&order=created_at.desc`,
      {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setEvents([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="rounded-md border border-[#F4F4EE]">
      {isLoading &&
        Array.from({ length: 20 }).map((_, index) => (
          <LeadRowSkel key={`lead-skel-${index}`} />
        ))}
      {events.map((event) => (
        <LeadRow key={event.id} event={event} />
      ))}
    </div>
  );
};

export default LeadsList;
