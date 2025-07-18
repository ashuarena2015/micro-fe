type LoadRemoteModuleOptions = {
  url: string;
  scope: string;
  module: string;
};

export async function loadRemoteModule({ url, scope, module }: LoadRemoteModuleOptions): Promise<any> {
  // Check if remoteEntry is already loaded
  // @ts-ignore
  if (!window[scope]) {
    await new Promise<void>((resolve, reject) => {
      const element = document.createElement('script');
      element.src = url;
      element.type = 'text/javascript';
      element.async = true;

      element.onload = () => {
        resolve();
      };

      element.onerror = () => {
        reject(new Error(`Failed to load remote entry: ${url}`));
      };

      document.head.appendChild(element);
    });
  }

  // Initialize sharing
  // @ts-ignore
  await __webpack_init_sharing__('default');
  // @ts-ignore
  const container = window[scope];
  // @ts-ignore
  await container.init(__webpack_share_scopes__.default);
  const factory = await container.get(module);
  return factory();
}
