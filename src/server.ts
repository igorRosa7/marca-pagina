import { createApp } from "./app.js";
import { env } from "./shared/env.js";

createApp().listen(env.PORT, () => {
  console.log(`Server listening on http://localhost:${env.PORT}`);
});
