// Add type declarations for Webpack Module Federation globals
declare const __webpack_init_sharing__: (scope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: unknown };

export async function loadRemoteModule(scope: string, module: string) {
  await __webpack_init_sharing__('default');

  const container = (window as any)[scope];

  // initialize the container, it may provide shared modules
  await container.init(__webpack_share_scopes__.default);

  const factory = await container.get(module);
  return factory();
}
