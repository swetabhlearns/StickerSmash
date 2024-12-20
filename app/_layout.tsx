import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
export default function RootLayout() {
  const queryClient = new QueryClient();

  useReactQueryDevTools(queryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen name="+not-found" options={{}} />
      </Stack>
    </QueryClientProvider>
  );
}
