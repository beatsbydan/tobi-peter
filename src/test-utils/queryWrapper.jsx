import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Shared render/renderHook wrapper for tests that exercise TanStack Query hooks —
// retries and window-focus refetching only add noise/timeouts in tests.
export function createQueryWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, refetchOnWindowFocus: false },
      mutations: { retry: false },
    },
  })
  return {
    queryClient,
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  }
}
