import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { ensureBufferPolyfill } from "./lib/buffer-polyfill";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  ensureBufferPolyfill();
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
