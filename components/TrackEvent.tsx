"use client";

import { useEffect, useState } from "react";

const TrackEvent = () => {
  const [requestUrl, setRequestUrl] = useState<string>("");
  const [result, setResult] = useState<string>("waiting");
  const [events, setEvents] = useState<string>("loading");

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;
    if (!url || !key) return;

    const fullUrl = window.location.href;
    setRequestUrl(fullUrl);

    // fetch(`${url}/rest/v1/events`, {
    //   method: "POST",
    //   headers: {
    //     apikey: key,
    //     Authorization: `Bearer ${key}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ url: fullUrl }),
    // })
    //   .then(async (res) => {
    //     const text = await res.text();
    //     setResult(`status ${res.status}${text ? `: ${text}` : ""}`);
    //   })
    //   .catch((error) => {
    //     setResult(`error: ${error}`);
    //   });

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
        setEvents(JSON.stringify(data, null, 2));
      })
      .catch((error) => {
        setEvents(`error: ${error}`);
      });
  }, []);

  return (
    <div className="px-8 py-4 text-sm text-zinc-500">
      {/* <div>request: {requestUrl || "—"}</div>
      <div>result: {result}</div> */}
      <pre className="mt-3 whitespace-pre-wrap">{events}</pre>
    </div>
  );
};

export default TrackEvent;
