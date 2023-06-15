type TEnvConfig = Record<
  Env,
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
    plugin:
      | null
      | (() => {
          name: string;
          transformIndexHtml(html: string): string;
        });
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

export enum Env {
  DEFAULT = "default",
  LOCAL = "local",
}

export const config: TEnvConfig = {
  [Env.DEFAULT]: {
    plugin: null,
    base: "/",
  },
  [Env.LOCAL]: {
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
