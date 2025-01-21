import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

import {thorThemePlugin} from "./thorThemePlugin";

export default defineConfig({
  plugins: [react(), thorThemePlugin()],
  optimizeDeps: {
    include: ["@storybook/theming", "@mdx-js/react"],
  },
});
