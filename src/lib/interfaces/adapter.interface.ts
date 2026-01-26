export interface CoreAdapter {
  name: string;
  mount(...args: unknown[]): unknown;
  configure(...args: unknown[]): unknown;
  listen(...args: unknown[]): unknown;
  unmount(...args: unknown[]): unknown;
}
