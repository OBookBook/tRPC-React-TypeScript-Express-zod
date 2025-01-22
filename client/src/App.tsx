import "./App.css";
import { useState } from "react";
import { trpc } from "./utils/trpc";
import TodoList from "./components/TodoList";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: "http://localhost:5000/trpc" })],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
