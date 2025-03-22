// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@youmeet/tailwind-config";

const config: Pick<Config, "content" | "presets"> = {
  content: ["./**/*.{js,ts,jsx,tsx}"],
  presets: [sharedConfig],
};

export default config;
