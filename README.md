
## Screenshots

### Application Dashboard

![AI Agent Dashboard](./screenshots/dashboard.png)

### Inngest Workflow Runs

![Inngest Workflow Runs](./screenshots/workflow-runs.png)


# AI Agent Workflow Dashboard

A web application built with **Next.js, TypeScript, and Inngest** to trigger and manage event-driven workflows. The project demonstrates asynchronous task execution, event-based communication, workflow steps, and delayed execution through a simple dashboard.

## Overview

The AI Agent Workflow Dashboard provides a user interface for testing different Inngest workflows. Users can trigger events from the frontend and monitor workflow execution through the Inngest development dashboard.

## Features

- **Sleep Workflow:** Demonstrates delayed execution using a 20-minute sleep step.
- **Approval Workflow:** Waits for an approval response associated with a specific request ID, with a configurable timeout.
- **Multi-Step Workflow:** Demonstrates data validation, processing, and result handling across multiple steps.
- **Event API:** Sends frontend events to Inngest through a Next.js API route.
- **Interactive Dashboard:** Provides buttons to trigger workflows and displays event submission status.
- **Workflow Monitoring:** Supports inspecting workflow runs through the Inngest Dev Server.

## Screenshots

### Application Dashboard

![AI Agent Dashboard](./screenshots/dashboard.png)

### Inngest Workflow Runs

![Inngest Workflow Runs](./screenshots/workflow-runs.png)

> Make sure both screenshot files exist in the `screenshots` folder. If you use different filenames, update the image paths above.

## Tech Stack

- **Next.js** — frontend and API routes
- **React** — interactive user interface
- **TypeScript** — type-safe application code
- **Inngest** — event-driven workflows and step execution
- **Tailwind CSS** — dashboard styling

## Project Structure

```text
ai-agent/
├── app/
│   ├── api/
│   │   ├── events/
│   │   │   └── route.ts
│   │   └── inngest/
│   │       └── route.ts
│   ├── inngest/
│   │   ├── client.ts
│   │   └── functions.ts
│   └── page.tsx
├── screenshots/
│   ├── dashboard.png
│   └── workflow-runs.png
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd ai-agent
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Next.js Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Start Inngest Dev Server

Open a second terminal in the project directory and run:

```bash
npx inngest-cli@latest dev
```

Open [http://localhost:8288](http://localhost:8288) to inspect registered functions and workflow runs.

## How to Test

1. Open the application dashboard.
2. Select **Sleep 20 Minutes** to trigger the sleep workflow.
3. Select **Start Waiting**, then **Approve** to send a matching approval response.
4. Select **Multi-Step Workflow** to execute the validation, processing, and result-handling steps.
5. Inspect workflow executions in the Inngest development dashboard.

**Note:** The frontend status confirms event submission, not workflow completion. The current multi-step example logs the result rather than persisting it to a database.

## Environment Variables

If your project uses environment variables, create a local `.env.local` file and add the required values for your configuration.

Do not commit `.env.local`, API keys, or other secrets to GitHub.

## Learning Objectives

This project explores:

- Event-driven application architecture
- Asynchronous workflow execution
- Multi-step background tasks
- Event matching and approval handling
- API routes in Next.js
- TypeScript with React and Inngest

## Future Improvements

- Persist workflow results in a database.
- Display workflow status and results directly in the frontend.
- Add authentication and access control.
- Deploy the application and configure production event handling.

## Author

**Rahma Nor**

GitHub: [DevRahmaNor](https://github.com/DevRahmaNor)

---

*Built as a learning project to explore event-driven workflows and full-stack web development.*