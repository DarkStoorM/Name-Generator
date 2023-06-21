import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TEnv, getCustomPlugin } from "./vite.env.config";

/*
 * --------------------------------------------------------------------------
 * LOCAL BUILDS CONFIGURATION
 * --------------------------------------------------------------------------
 *
 * Vite is bad with local builds outside the development, so some adjustment
 * has to be made. Vite builds html with module type + crossorigin injected
 * into the scripts, which can't be used to run the built app without a server
 *
 * In addition, defer is missing, which has to be added manually, but can be
 * done by this setting by changing the build "environment"
 *
 * Yes, `type="module"` uses defer by default, but can't be used outside the
 * server environment
 *
 * WARNING:
 *
 * If you want to build a release for local use without a server (offline use),
 * switch to `local` environment, as this will change how the HTML is emitted
 *
 * With `default` environment settings, Vite will emit its regular HTML with modules
 */
const ENVIRONMENT: TEnv = "default";

const [basePath, customPlugin] = getCustomPlugin(ENVIRONMENT);
export default defineConfig({
  plugins: [react(), customPlugin],
  base: basePath,
});
