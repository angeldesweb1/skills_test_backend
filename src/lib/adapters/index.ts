import { CoreAdapter } from '@lib/interfaces';

const adapters = {
  express: async () => {
    const { ExpressAdapter } = await require('./express/express.adapter');
    return ExpressAdapter;
  },
  http: async () => {
    const { HTTPAdapter } = await require('./http/http.adapter');
    return HTTPAdapter;
  },
};

export type SupportedAdapters = keyof typeof adapters;

export async function getAdapter(
  adapter: SupportedAdapters,
): Promise<new () => CoreAdapter> {
  return adapters[adapter]();
}
