export const loadRemoteEntry = (url: string, scope: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    if ((window as any)[scope]) {
      return resolve(); // Already loaded
    }

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
};
