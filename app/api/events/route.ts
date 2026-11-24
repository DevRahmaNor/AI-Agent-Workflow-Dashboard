
import { NextResponse } from "next/server";
import { inngest } from "@/app/inngest/client";

const allowedEvents = [
  "demo/sleep",
  "approval/request",
  "approval/response",
  "demo/multistep",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventName, data } = body;

    if (!allowedEvents.includes(eventName)) {
      return NextResponse.json(
        { error: "Invalid event name." },
        { status: 400 }
      );
    }

    await inngest.send({
      name: eventName,
      data,
    });

    return NextResponse.json({
      success: true,
      message: `Event ${eventName} sent successfully.`,
    });
  } catch (error) {
    console.error("Failed to send event:", error);

    return NextResponse.json(
      { error: "Failed to send event." },
      { status: 500 }
    );
  }
}
