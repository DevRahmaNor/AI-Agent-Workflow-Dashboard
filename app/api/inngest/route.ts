
import { serve } from "inngest/next";
import { inngest } from "@/app/inngest/client";
import {
  SimpleGreetor,
  dataProcessor,
  emailSender,
  approvalWorkflow,
  apiFetcher,
  dailyReport,
  batchProcessor,
  sleepWorkflow,
  waitWorkflow,
  multiStepWorkflow,
  createUser,
} from "@/app/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [SimpleGreetor, dataProcessor, emailSender, approvalWorkflow, apiFetcher, dailyReport, batchProcessor, createUser, sleepWorkflow, waitWorkflow, multiStepWorkflow],
});
