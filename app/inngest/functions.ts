
import { inngest } from "./client";

// 1. Simple Greeting
export const SimpleGreetor = inngest.createFunction(
  {
    id: "simple-greetor",
    triggers: { event: "greet/user" },
  },
  async ({ event, step }) => {
    return await step.run("say-hello", async () => {
      return `Hello ${event.data.name}!`;
    });
  }
);

// 2. Data Processor
export const dataProcessor = inngest.createFunction(
  {
    id: "data-processor",
    triggers: { event: "data/process" },
  },
  async ({ step }) => {
    const rawData = await step.run("fetch-data", async () => {
      console.log("Fetching data...");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return {
        users: ["Alice", "Bob", "Charlie"],
      };
    });

    const transformedData = await step.run(
      "transform-data",
      async () => {
        console.log("Transforming data...");

        return rawData.users.map((user) => ({
          name: user,
          email: `${user.toLowerCase()}@example.com`,
        }));
      }
    );

    return await step.run("save-data", async () => {
      console.log("Saving data...");

      await new Promise((resolve) => setTimeout(resolve, 500));

      return {
        saved: transformedData.length,
        data: transformedData,
      };
    });
  }
);

// 3. Email Sender
export const emailSender = inngest.createFunction(
  {
    id: "email-sender",
    triggers: { event: "email/send" },
  },
  async ({ event, step }) => {
    const { emails } = event.data;
    const results = [];

    for (const email of emails) {
      const result = await step.run(
        `send-email-${email}`,
        async () => {
          console.log(`Sending email to ${email}...`);

          await new Promise((resolve) => setTimeout(resolve, 200));

          return {
            email,
            status: "sent",
            timestamp: new Date().toISOString(),
          };
        }
      );

      results.push(result);

      if (email !== emails[emails.length - 1]) {
        await step.sleep(`rate-limit-${email}`, "2s");
      }
    }

    return {
      sent: results.length,
      results,
    };
  }
);

// 4. Approval Workflow
export const approvalWorkflow = inngest.createFunction(
  {
    id: "approval-workflow",
    triggers: { event: "workflow/start" },
  },
  async ({ event, step }) => {
    const { requestId, action } = event.data;

    await step.run("process-request", async () => {
      console.log(`Processing request: ${action}`);

      return {
        requestId,
        action,
        status: "pending_approval",
      };
    });

    const approval = await step.waitForEvent("wait-for-approval", {
      event: "workflow/approval",
      timeout: "1h",
      match: "data.requestId",
    });

    if (!approval) {
      return {
        requestId,
        status: "timeout",
        message: "Approval not received within 1 hour",
      };
    }

    return await step.run("execute-action", async () => {
      if (approval.data.approved) {
        console.log(`Executing approved action: ${action}`);

        return {
          requestId,
          status: "completed",
          action,
        };
      }

      return {
        requestId,
        status: "rejected",
        reason: approval.data.reason,
      };
    });
  }
);

// 5. API Fetcher
export const apiFetcher = inngest.createFunction(
  {
    id: "api-fetcher",
    triggers: { event: "api/fetch" },
    retries: 3,
  },
  async ({ event, step }) => {
    const { url } = event.data;

    const data = await step.run("fetch-api", async () => {
      console.log(`Fetching from ${url}...`);

      // Simulate a temporary API failure
      if (Math.random() > 0.3) {
        throw new Error("API temporarily unavailable");
      }

      return {
        url,
        data: "Success!",
      };
    });

    return data;
  }
);

// 6. Daily Report
export const dailyReport = inngest.createFunction(
  {
    id: "daily-report",
    triggers: { cron: "* * * * *" },
  },
  async ({ step }) => {
    const report = await step.run("generate-report", async () => {
      const timestamp = new Date().toISOString();

      console.log(`Generating daily report at ${timestamp}`);

      return {
        date: new Date().toDateString(),
        metrics: {
          users: Math.floor(Math.random() * 1000),
          revenue: Math.floor(Math.random() * 10000),
        },
        generatedAt: timestamp,
      };
    });

    return report;
  }
);

// 7. Batch Processor
export const batchProcessor = inngest.createFunction(
  {
    id: "batch-processor",
    triggers: { event: "batch/process" },
  },
  async ({ event, step }) => {
    const { items } = event.data;

    console.log(`Processing ${items.length} items...`);

    const results = await Promise.all(
      items.map((item: string, index: number) =>
        step.run(`process-item-${index}`, async () => {
          console.log(`Processing item: ${item}`);

          await new Promise((resolve) => setTimeout(resolve, 500));

          return {
            item,
            processed: true,
            timestamp: new Date().toISOString(),
          };
        })
      )
    );

    return {
      processed: results.length,
      results,
    };
  }
);



export const sleepWorkflow = inngest.createFunction(
  {
    id: "sleep-workflow",
    triggers: { event: "demo/sleep" },
  },
  async ({ event, step }) => {
    await step.run("start-sleep", async () => {
      console.log("Sleep workflow started.");

      return { status: "sleeping" };
    });

    await step.sleep("sleep-20-minutes", "20m");

    return await step.run("finish-sleep", async () => {
      console.log("20-minute sleep completed.");

      return {
        message: "Sleep completed!",
        name: event.data.name,
      };
    });
  }
);



export const waitWorkflow = inngest.createFunction(
  {
    id: "wait-workflow",
    triggers: { event: "approval/request" },
  },
  async ({ event, step }) => {
    const { requestId } = event.data;

    await step.run("start-waiting", async () => {
      console.log(`Waiting for request: ${requestId}`);

      return {
        requestId,
        status: "waiting",
      };
    });

    const response = await step.waitForEvent(
      "wait-for-response",
      {
        event: "approval/response",
        match: "data.requestId",
        timeout: "30m",
      }
    );

    if (!response) {
      return {
        requestId,
        status: "timeout",
        message: "No response received within 30 minutes.",
      };
    }

    return await step.run("process-response", async () => {
      console.log("Response received:", response.data);

      return {
        requestId,
        status: "completed",
        approved: response.data.approved,
      };
    });
  }
);


export const multiStepWorkflow = inngest.createFunction(
  {
    id: "multi-step-workflow",
    triggers: { event: "demo/multistep" },
  },
  async ({ event, step }) => {
    // Step 1: Validate the name
    const validated = await step.run(
      "validate-data",
      async () => {
        if (!event.data.name) {
          throw new Error("Name is required.");
        }

        return {
          name: event.data.name,
          valid: true,
        };
      }
    );

    // Step 2: Process the name
    const processed = await step.run(
      "process-data",
      async () => {
        return {
          name: validated.name.toUpperCase(),
          message: "Data processed successfully.",
        };
      }
    );

    // Step 3: Save the result
    const saved = await step.run(
      "save-result",
      async () => {
        console.log("Saving result:", processed);

        return {
          saved: true,
          result: processed,
        };
      }
    );

    return saved;
  }
);




export const createUser = inngest.createFunction(
  {
    id: "create-user",
    triggers: { event: "user/create" },
  },
  async ({ event, step }) => {
    const { email, name } = event.data;

    console.log(`Creating user: ${name} with email: ${email}`);

    await step.run("save-user", async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log(`User ${name} saved to database.`);
    });

    return { email, name };
  }
);