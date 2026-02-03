"use client";

import { useEffect, useRef, useState } from "react";

const STATUSES = [
  { label: "Lead", color: "bg-green-600" },
  { label: "Warm", color: "bg-amber-300" },
  { label: "Cold", color: "bg-slate-400" },
] as const;

const LeadRow = () => {
  const [status, setStatus] = useState(STATUSES[0]);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (menuRef.current.contains(event.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div>
    <div className="flex gap-4 px-8 py-4.5 font-bold">
        {/* id */}
        <div className="text-zinc-500 w-1/12">#390</div>
 
        {/*  source */}
      <div className="flex items-center gap-2 w-2/12 text-zinc-500">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="size-4 text-[#1877F2]"
          fill="currentColor"
        >
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.018 4.388 11.01 10.125 11.927v-8.442H7.078v-3.485h3.047V9.413c0-3.034 1.792-4.714 4.533-4.714 1.312 0 2.686.236 2.686.236v2.98h-1.512c-1.49 0-1.956.93-1.956 1.887v2.271h3.328l-.532 3.485h-2.796V24C19.612 23.083 24 18.09 24 12.073z" />
        </svg>
        <span className="text-zinc-900 ">FB Ads</span>
      </div>
    
        
      {/* date */}
        <div className="text-zinc-500 w-2/12">6:02:23 3/02</div>
        {/* camp.name */}
        <div className="text-zinc-500 w-2/12">РСЯ Тест - Форма 2</div>
        {/* creat.id */}
        <div className="text-zinc-500 w-2/12">6:02:23 3/02</div>

    {/* status */}
      <div ref={menuRef} className="relative  w-2/12">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex items-center gap-2 text-zinc-500 underline underline-offset-[3px] hover:cursor-pointer"
        >
          <span className={`inline-block size-2.5 rounded-full ${status.color}`} />
          <span>{status.label}</span>
        </button>
        {open && (
          <div className="absolute left-0 top-full z-10 mt-2 w-28 rounded-md border border-zinc-200 bg-white p-1 shadow-sm">
            {STATUSES.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  setStatus(item);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded px-2 py-1 text-left  text-zinc-600 hover:bg-zinc-50"
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
          className="ml-auto cursor-pointer"
        >
          <span
            className={`inline-block bg-slate-900/70 text-sm px-1.5 py-0.5 rounded-full text-white transition-transform ${
              expanded ? "rotate-180" : ""
            }`}
          >
            ↓
          </span>
        </button>

    </div>
    
    <div
      className={`font-medium w-11/12 flex ml-auto overflow-hidden transition-[max-height,opacity] duration-200 ${
        expanded ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="px-8 pb-4 text-zinc-500">
        <div className="mb-4">
            123
        </div>
        <div className="flex flex-row gap-4"> 
            <div className="my-auto">Примечание:</div>
            <textarea
                rows={3}
                placeholder="Добавить комментарий…"
                className="mt-3 w-full resize-none rounded-md border border-zinc-200 bg-white px-3 py-2 text-zinc-700 placeholder:text-zinc-400"
                />
        </div>
      </div>
    </div>

    </div>
  );
};

export default LeadRow;
