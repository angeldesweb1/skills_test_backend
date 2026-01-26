export interface CoreAdapter {
  mount(...args: unknown[]): unknown;
  listen(...args: unknown[]): unknown;
  unmount(...args: unknown[]): unknown;
}
