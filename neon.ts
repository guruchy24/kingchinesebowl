import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  buckets: {
    "kcb-media": { access: "public_read" },
  },
});
