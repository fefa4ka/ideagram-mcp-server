#!/usr/bin/env node

import { runServer } from "./server.js";

const apiKey = process.env.IDEOGRAM_API_KEY;
if (!apiKey) {
  throw new Error("IDEOGRAM_API_KEY environment variable is required");
}

runServer(apiKey).catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
