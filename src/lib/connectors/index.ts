import { CoreDBConnector } from '@lib/interfaces';

const connectors = {
  mongoose: async () => {
    const { MongooseConnector } = await require('./mongoose');
    return MongooseConnector;
  },
};

export type SupportedConnectors = keyof typeof connectors;

export async function getConnector(
  key: SupportedConnectors,
): Promise<new () => CoreDBConnector> {
  return await connectors[key]();
}
