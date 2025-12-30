import { Stack } from "expo-router";
import { PurchasesProvider } from "./hooks/usePurchases";

export default function RootLayout() {
  return (
    <PurchasesProvider>
      <Stack />
    </PurchasesProvider>
  );
}
