import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queyClient = new QueryClient();
export default function QueryProvider({children}: PropsWithChildren) {
  return <QueryClientProvider client={queyClient}>{children}</QueryClientProvider>;
}
