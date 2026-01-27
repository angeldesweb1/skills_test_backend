export interface CoreDBConnector {
  connect(...args: unknown[]): unknown;
  disconnect(...args: unknown[]): unknown;
}
