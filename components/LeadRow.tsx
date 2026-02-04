"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const STATUSES = [
  { label: "Новый", color: "bg-slate-400" },
  { label: "В процессе", color: "bg-amber-300" },
  { label: "Конверсия", color: "bg-emerald-600" },
  { label: "Отказ", color: "bg-zinc-500" },
] as const;

type LeadEvent = {
  id: string;
  created_at: string;
  url: string;
  status?: string | null;
  comment?: string | null;
};

const LeadRow = ({ event }: { event: LeadEvent }) => {
  const initialStatus =
    STATUSES.find((item) => item.label === event.status) ?? STATUSES[0];
  const [status, setStatus] = useState(initialStatus);
  const [comment, setComment] = useState(event.comment ?? "");
  const [savedComment, setSavedComment] = useState(event.comment ?? "");
  const lastSavedComment = useRef(event.comment ?? "");
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const { dateLabel, utmCampaign, utmId, utmSource, utmMedium, extraEntries } =
    useMemo(() => {
    let dateLabelValue = event.created_at;
    const created = new Date(event.created_at);
    if (!Number.isNaN(created.getTime())) {
      dateLabelValue = created.toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }

    let params: URLSearchParams;
    try {
      params = new URL(event.url).searchParams;
    } catch {
      params = new URLSearchParams();
    }

    const utmCampaignValue = params.get("utm_campaign") ?? "—";
    const utmIdValue = params.get("utm_id") ?? "—";
    const utmSourceValue = params.get("utm_source") ?? "—";
    const utmMediumValue = params.get("utm_medium") ?? "—";
    const extras = Array.from(params.entries()).filter(
      ([key]) =>
        key !== "utm_campaign" &&
        key !== "utm_id" &&
        key !== "utm_source" &&
        key !== "utm_medium",
    );

    return {
      dateLabel: dateLabelValue,
      utmCampaign: utmCampaignValue,
      utmId: utmIdValue,
      utmSource: utmSourceValue,
      utmMedium: utmMediumValue,
      extraEntries: extras,
    };
  }, [event.created_at, event.url]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (menuRef.current.contains(event.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const patchEvent = useCallback(
    async (payload: { status?: string | null; comment?: string | null }) => {
      try {
        if (!supabaseUrl || !supabaseKey) {
          console.error("Missing Supabase configuration.");
          return;
        }

        const res = await fetch(
          `${supabaseUrl}/rest/v1/events?id=eq.${encodeURIComponent(event.id)}`,
          {
            method: "PATCH",
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              "Content-Type": "application/json",
              Prefer: "return=representation",
            },
            body: JSON.stringify(payload),
          },
        );
        const text = await res.text();
        if (!res.ok) {
          throw new Error(`Failed to update: ${res.status}`);
        }
        if (text) {
          console.log("status patch response", text);
        }
        if ("comment" in payload) {
          setSavedComment(payload.comment ?? "");
        }
      } catch (error) {
        console.error(error);
      }
    },
    [event.id, supabaseKey, supabaseUrl],
  );

  return (
    <div className="border-b border-[#E5E7EB] last:border-0 bg-[#F4F4EE] first:rounded-t-md last:rounded-b-md">
        <div className="flex items-center px-8 py-4.5 bg-[#F4F4EE] ">
            {/* id */}
            <div className="w-1/12">{event.id.slice(0, 6)}</div>        
            
        {/* date */}
            <div className="w-2/12">{dateLabel}</div>
            {/* camp.name */}
            <div className="w-4/12 flex items-center gap-2">
                <img
                  src="/yandex-logo-rus.png"
                  alt="Yandex"
                  className="size-5 self-center"
                />
                <span className="leading-none">{utmCampaign}</span>

            </div>
            {/* creat.id */}
            <div className="w-2/12">{utmId}</div>

        {/* status */}
        <div ref={menuRef} className="relative  w-2/12">
            <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex items-center gap-2 underline underline-offset-[3px] hover:cursor-pointer"
            >
            <span className={`inline-block size-2.5 rounded-full ${status.color}`} />
            <span>{status.label}</span>
            </button>
            {open && (
            <div className="absolute left-0 top-full z-10 mt-2 w-40 rounded-md border border-zinc-200 bg-white p-1 shadow-sm">
                {STATUSES.map((item) => (
                <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                    if (item.label === status.label) {
                      setOpen(false);
                      return;
                    }
                    console.log("status change", {
                      id: event.id,
                      from: status.label,
                      to: item.label,
                    });
                    setStatus(item);
                    setOpen(false);
                    patchEvent({ status: item.label });
                    }}
                    className="flex w-full items-center gap-2 rounded px-2 py-1 text-left hover:bg-zinc-50"
                >
                    <span className={`inline-block size-2 rounded-full ${item.color}`} />
                    <span>{item.label}</span>
                </button>
                ))}
            </div>
            )}
        </div>

            {/* more */}
            <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="w-1/12 ml-auto flex items-center justify-end cursor-pointer"
            >
            <span
                className={`inline-flex bg-slate-900/70 px-0.5 py-0.5 rounded-full text-white transition-transform ${
                expanded ? "rotate-180" : ""
                }`}
            >
                <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4" fill="currentColor">
                    <path d="M5.5 7.5a1 1 0 0 1 1.4 0L10 10.6l3.1-3.1a1 1 0 1 1 1.4 1.4l-3.8 3.8a1 1 0 0 1-1.4 0l-3.8-3.8a1 1 0 0 1 0-1.4z" />
                </svg>
            </span>
            </button>

        </div>
        
        <div
            className={`bg-[#F4F4EE] pl-1/12 flex ml-auto overflow-hidden transition-[max-height,opacity] duration-200 ${
                expanded ? "max-h-64 opacity-100 border-t border-[#E5E7EB]" : "max-h-0 opacity-0"
            }`}
        >
            <div className="px-8 pb-0 my-4 gap-0 flex flex-col w-full">
            
                <div className="flex flex-row flex-wrap items-center gap-2 text-sm">
                    <span className="rounded-full bg-[#EEEDE6] px-3 py-1.5">
                    utm_source: <span>{utmSource}</span>
                    </span>
                    <span className="rounded-full bg-[#EEEDE6] px-3 py-1.5">
                    utm_medium: <span>{utmMedium}</span>
                    </span>
                    {extraEntries.map(([key, value]) => (
                    <span
                        key={key}
                        className="rounded-full bg-[#EEEDE6] px-3 py-1.5"
                    >
                        {key}: <span>{value || "—"}</span>
                    </span>
                    ))}
                </div>
            
                <div className="flex flex-col gap-4 ">
                    <input
                        type="text"
                        placeholder="Добавить комментарий…"
                        className={`mt-3 w-full resize-none rounded-md bg-white px-4 py-2 transition-opacity ${
                          comment === savedComment ? "opacity-70" : "opacity-100"
                        }`}
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        onBlur={() => {
                        if (comment === lastSavedComment.current) return;
                        lastSavedComment.current = comment;
                        patchEvent({ comment });
                        }}
                        onKeyDown={(event) => {
                        if (event.key !== "Enter") return;
                        if (comment === lastSavedComment.current) return;
                        lastSavedComment.current = comment;
                        patchEvent({ comment });
                        event.currentTarget.blur();
                        }}
                    />
                </div>
            </div>
        </div>

    </div>
  );
};

export default LeadRow;
