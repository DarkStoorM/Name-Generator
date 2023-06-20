// Extract the messy Vite typings
type TEnvPluginResult = {
  name: string;
  transformIndexHtml(html: string): string;
};

/**
 * Alias of the return type for the accepted plugins type by Vite Config
 */
type TEnvPlugin = null | (() => TEnvPluginResult);

/**
 * Application environment switch
 */
export type TEnv = "default" | "local";

type TEnvConfig = Record<
  TEnv,
  {
    /**
     * Custom plugin to use during the environment check.
     *
     * When the environment is changed to Local, a custom plugin will be called when building
     * for production, which will replace the module type, which can't be used outside the
     * server environment
     *
     * @default null
     */
    plugin: TEnvPlugin;

    /**
     * Base path where the assets are served from. While the default is `'/'`, it can't be
     * used when building for production when the application is used outside the server
     * environment
     *
     * @default '/'
     */
    base: string;
  }
>;

const config: TEnvConfig = {
  default: {
    plugin: null,
    base: "/",
  },
  local: {
    plugin: swapModule,
    base: "./",
  },
};

/**
 * Temporary "solution" for local builds. Can't use module type along with crossorigin
 * with file:// protocols, preventing the files from loading
 */
function swapModule() {
  return {
    name: "no-attribute",
    transformIndexHtml(html: string) {
      return html.replace(`type="module" crossorigin`, "defer");
    },
  };
}

/**
 * Returns the Vite config plugin `config`, which is used to change the way Vite builds the
 * source
 */
export function getCustomPlugin(environment: TEnv): [string, TEnvPluginResult] {
  const plugin = config[environment].plugin;
  let customPlugin: TEnvPluginResult = null;

  if (plugin) {
    customPlugin = plugin();
  }

  return [config[environment].base, customPlugin];
}
