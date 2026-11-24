
"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState("");

  async function sendEvent(
    eventName: string,
    data: Record<string, unknown>
  ) {
    setLoading(true);
    setMessage("Sending event...");

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventName, data }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send event.");
      }

      setMessage(result.message);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  function startWaiting() {
    const id = crypto.randomUUID();
    setRequestId(id);

    void sendEvent("approval/request", {
      requestId: id,
    });
  }

  function approveRequest() {
    if (!requestId) {
      setMessage("Please click Start Waiting first.");
      return;
    }

    void sendEvent("approval/response", {
      requestId,
      approved: true,
    });
  }

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-white">
      <div className="mx-auto max-w-2xl space-y-6 py-12">
        <h1 className="text-3xl font-bold">
          Inngest Workflow Dashboard
        </h1>

        <p className="text-slate-300">
          Start and test your Inngest workflows.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            onClick={() =>
              void sendEvent("demo/sleep", {
                name: "Rahma",
              })
            }
            disabled={loading}
            className="rounded-xl bg-blue-600 p-4 font-semibold disabled:opacity-50"
          >
            Sleep 20 Minutes
          </button>

          <button
            onClick={startWaiting}
            disabled={loading}
            className="rounded-xl bg-purple-600 p-4 font-semibold disabled:opacity-50"
          >
            Start Waiting
          </button>

          <button
            onClick={approveRequest}
            disabled={loading || !requestId}
            className="rounded-xl bg-green-600 p-4 font-semibold disabled:opacity-50"
          >
            Approve
          </button>

          <button
            onClick={() =>
              void sendEvent("demo/multistep", {
                name: "Rahma",
              })
            }
            disabled={loading}
            className="rounded-xl bg-orange-600 p-4 font-semibold disabled:opacity-50"
          >
            Multi-Step Workflow
          </button>
        </div>

        {requestId && (
          <p className="break-all text-sm text-slate-300">
            Request ID: {requestId}
          </p>
        )}

        {message && (
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
            <p className="font-medium">Status</p>
            <p className="mt-2 break-words text-slate-300">
              {message}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
